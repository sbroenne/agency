const DATA_URL = './squads.json';
const statusOrder = ['live', 'building', 'prototype'];

const state = {
  squads: [],
  query: '',
  status: 'all',
  focus: 'all',
  selectedId: null,
};

const elements = {
  statSquads: document.querySelector('#stat-squads'),
  statMembers: document.querySelector('#stat-members'),
  statDomains: document.querySelector('#stat-domains'),
  resultsSummary: document.querySelector('#results-summary'),
  searchInput: document.querySelector('#search-input'),
  statusFilters: document.querySelector('#status-filters'),
  focusFilters: document.querySelector('#focus-filters'),
  cardGrid: document.querySelector('#card-grid'),
  cardTemplate: document.querySelector('#card-template'),
  emptyState: document.querySelector('#empty-state'),
  resetFilters: document.querySelector('#reset-filters'),
  detailTitle: document.querySelector('#detail-title'),
  detailEmpty: document.querySelector('#detail-empty'),
  detailContent: document.querySelector('#detail-content'),
  copyLink: document.querySelector('#copy-link'),
};

initialize().catch((error) => {
  console.error(error);
  elements.resultsSummary.textContent = 'Unable to load squads right now.';
  elements.emptyState.hidden = false;
});

async function initialize() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Failed to load ${DATA_URL}: ${response.status}`);
  }

  const payload = await response.json();
  state.squads = Array.isArray(payload.squads) ? payload.squads : [];
  state.selectedId = getSelectedIdFromHash() ?? state.squads[0]?.id ?? null;

  renderStats(payload.counts);
  renderFilters();
  bindEvents();
  render();
}

function bindEvents() {
  elements.searchInput.addEventListener('input', (event) => {
    state.query = event.target.value.trim().toLowerCase();
    render();
  });

  elements.resetFilters.addEventListener('click', () => {
    state.query = '';
    state.status = 'all';
    state.focus = 'all';
    elements.searchInput.value = '';
    renderFilters();
    render();
  });

  elements.copyLink.addEventListener('click', async () => {
    if (!state.selectedId) {
      return;
    }

    const url = new URL(window.location.href);
    url.hash = `squad/${state.selectedId}`;

    try {
      await navigator.clipboard.writeText(url.toString());
      elements.copyLink.textContent = 'Copied';
      window.setTimeout(() => {
        elements.copyLink.textContent = 'Copy link';
      }, 1500);
    } catch (error) {
      console.error(error);
      elements.copyLink.textContent = 'Copy failed';
      window.setTimeout(() => {
        elements.copyLink.textContent = 'Copy link';
      }, 1500);
    }
  });

  window.addEventListener('hashchange', () => {
    const selectedId = getSelectedIdFromHash();
    if (!selectedId) {
      return;
    }

    state.selectedId = selectedId;
    render();
  });
}

function renderStats(counts) {
  const derived = {
    squads: state.squads.length,
    members: state.squads.reduce((total, squad) => total + squad.members.length, 0),
    focusAreas: new Set(state.squads.flatMap((squad) => squad.focus.map((entry) => entry.toLowerCase()))).size,
  };
  const summary = counts ?? derived;

  elements.statSquads.textContent = String(summary.squads);
  elements.statMembers.textContent = String(summary.members);
  elements.statDomains.textContent = String(summary.focusAreas);
}

function renderFilters() {
  renderChipGroup(elements.statusFilters, ['all', ...collectStatuses()], state.status, (value) => {
    state.status = value;
    render();
  });

  renderChipGroup(elements.focusFilters, ['all', ...collectFocusAreas()], state.focus, (value) => {
    state.focus = value;
    render();
  });
}

function renderChipGroup(container, values, activeValue, onSelect) {
  container.replaceChildren();

  values.forEach((value) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-chip';
    button.textContent = value === 'all' ? 'All' : titleCase(value);
    button.setAttribute('aria-pressed', String(value === activeValue));
    button.addEventListener('click', () => {
      onSelect(value);
      renderFilters();
    });
    container.append(button);
  });
}

function render() {
  const filtered = getFilteredSquads();
  const selected = pickSelectedSquad(filtered);

  elements.resultsSummary.textContent = `${filtered.length} squad${filtered.length === 1 ? '' : 's'} shown`;
  elements.emptyState.hidden = filtered.length > 0;

  renderCards(filtered, selected?.id ?? null);
  renderDetail(selected);
}

function renderCards(squads, selectedId) {
  elements.cardGrid.replaceChildren();

  squads.forEach((squad) => {
    const fragment = elements.cardTemplate.content.cloneNode(true);
    const article = fragment.querySelector('.squad-card');
    const button = fragment.querySelector('.squad-card__button');
    const badge = fragment.querySelector('.badge');

    article.dataset.selected = String(squad.id === selectedId);
    fragment.querySelector('.squad-card__eyebrow').textContent = squad.sourceLabel;
    fragment.querySelector('.squad-card__title').textContent = squad.name;
    fragment.querySelector('.squad-card__tagline').textContent = squad.tagline;
    badge.textContent = squad.status;
    badge.dataset.tone = squad.status;
    fragment.querySelector('.meta-members').textContent = String(squad.members.length);
    fragment.querySelector('.meta-source').textContent = squad.location;

    const chips = fragment.querySelector('.squad-card__chips');
    squad.focus.slice(0, 3).forEach((focus) => {
      chips.append(createChip(focus));
    });

    const memberPreview = fragment.querySelector('.member-preview');
    squad.members.slice(0, 3).forEach((member) => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>${member.name}</strong><span>${member.role}</span>`;
      memberPreview.append(item);
    });

    button.addEventListener('click', () => {
      state.selectedId = squad.id;
      window.location.hash = `squad/${squad.id}`;
      render();
      document.querySelector('#detail')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });

    elements.cardGrid.append(fragment);
  });
}

function renderDetail(squad) {
  if (!squad) {
    elements.detailTitle.textContent = 'Choose a squad';
    elements.detailEmpty.hidden = false;
    elements.detailContent.hidden = true;
    elements.detailContent.replaceChildren();
    return;
  }

  elements.detailTitle.textContent = squad.name;
  elements.detailEmpty.hidden = true;
  elements.detailContent.hidden = false;

  const detail = document.createElement('div');
  detail.innerHTML = `
    <section>
      <div class="detail__header">
        <div>
          <p class="eyebrow">${squad.sourceLabel}</p>
          <h3>${squad.name}</h3>
          <p class="detail__summary">${squad.summary}</p>
        </div>
        <span class="badge" data-tone="${squad.status}">${squad.status}</span>
      </div>
    </section>
    <section>
      <div class="detail__meta">
        <div>
          <p class="detail__label">Focus areas</p>
          <p class="detail__value">${squad.focus.join(', ')}</p>
        </div>
        <div>
          <p class="detail__label">Members</p>
          <p class="detail__value">${squad.members.length}</p>
        </div>
        <div>
          <p class="detail__label">Manifest</p>
          <p class="detail__value">${squad.source.manifestPath}</p>
        </div>
      </div>
    </section>
    <section>
      <h4 class="detail__section-title">Mission</h4>
      <p>${squad.howTheyWork}</p>
    </section>
    <section>
      <h4 class="detail__section-title">Roster</h4>
      <ul class="detail__members"></ul>
    </section>
    <section>
      <h4 class="detail__section-title">Useful links</h4>
      <ul class="detail__links"></ul>
    </section>
  `;

  const roster = detail.querySelector('.detail__members');
  squad.members.forEach((member) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <div class="detail__member-copy">
        <strong>${member.name}</strong>
        <p>${member.role}</p>
      </div>
      <div>
        <strong>Expertise</strong>
        <p class="detail__member-expertise">${member.expertise.join(', ')}</p>
      </div>
    `;
    roster.append(item);
  });

  const links = detail.querySelector('.detail__links');
  squad.links.forEach((link) => {
    const item = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.textContent = link.label;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    item.append(anchor);
    links.append(item);
  });

  elements.detailContent.replaceChildren(detail);
}

function getFilteredSquads() {
  return state.squads.filter((squad) => {
    const matchesQuery =
      !state.query ||
      [
        squad.name,
        squad.tagline,
        squad.summary,
        squad.howTheyWork,
        squad.focus.join(' '),
        squad.members.map((member) => `${member.name} ${member.role} ${member.expertise.join(' ')}`).join(' '),
      ]
        .join(' ')
        .toLowerCase()
        .includes(state.query);

    const matchesStatus = state.status === 'all' || squad.status === state.status;
    const matchesFocus = state.focus === 'all' || squad.focus.includes(state.focus);

    return matchesQuery && matchesStatus && matchesFocus;
  });
}

function pickSelectedSquad(filtered) {
  const directMatch = filtered.find((squad) => squad.id === state.selectedId);
  if (directMatch) {
    return directMatch;
  }

  const fallback = filtered[0] ?? null;
  state.selectedId = fallback?.id ?? null;
  return fallback;
}

function getSelectedIdFromHash() {
  const match = window.location.hash.match(/^#squad\/(.+)$/);
  return match?.[1] ?? null;
}

function collectStatuses() {
  return [...new Set(state.squads.map((squad) => squad.status))].sort(
    (left, right) => statusOrder.indexOf(left) - statusOrder.indexOf(right),
  );
}

function collectFocusAreas() {
  return [...new Set(state.squads.flatMap((squad) => squad.focus))].sort((left, right) =>
    left.localeCompare(right),
  );
}

function createChip(label) {
  const chip = document.createElement('span');
  chip.className = 'filter-chip';
  chip.textContent = label;
  chip.setAttribute('aria-hidden', 'true');
  return chip;
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
