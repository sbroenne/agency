const DATA_URL = './squads.json';
const statusOrder = ['live', 'building', 'prototype'];
const DEFAULT_VISIBLE_FOCUS = 8;

const state = {
  squads: [],
  query: '',
  status: 'all',
  focus: [],
  focusQuery: '',
  selectedId: null,
};

const elements = {
  statSquads: document.querySelector('#stat-squads'),
  statMembers: document.querySelector('#stat-members'),
  statDomains: document.querySelector('#stat-domains'),
  resultsSummary: document.querySelector('#results-summary'),
  heroSearchForm: document.querySelector('#hero-search-form'),
  heroSearchInput: document.querySelector('#hero-search-input'),
  searchInput: document.querySelector('#search-input'),
  statusFilters: document.querySelector('#status-filters'),
  focusDrawer: document.querySelector('#focus-drawer'),
  focusSummary: document.querySelector('#focus-summary'),
  focusSelectionCount: document.querySelector('#focus-selection-count'),
  focusSearchInput: document.querySelector('#focus-search-input'),
  focusOptions: document.querySelector('#focus-options'),
  selectedFilters: document.querySelector('#selected-filters'),
  cardGrid: document.querySelector('#card-grid'),
  cardTemplate: document.querySelector('#card-template'),
  emptyState: document.querySelector('#empty-state'),
  resetFilters: document.querySelector('#reset-filters'),
  detailPanel: document.querySelector('#detail'),
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
  bindEvents();
  render();
}

function bindEvents() {
  const handleSearchInput = (value) => {
    state.query = value;
    syncSearchInputs();
    render();
  };

  elements.heroSearchInput.addEventListener('input', (event) => {
    handleSearchInput(event.target.value);
  });

  elements.searchInput.addEventListener('input', (event) => {
    handleSearchInput(event.target.value);
  });

  elements.heroSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#directory')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    elements.searchInput.focus();
  });

  elements.focusSearchInput.addEventListener('input', (event) => {
    state.focusQuery = event.target.value.trim().toLowerCase();
    renderFocusFilters();
  });

  elements.resetFilters.addEventListener('click', () => {
    state.query = '';
    state.status = 'all';
    state.focus = [];
    state.focusQuery = '';
    syncSearchInputs();
    elements.focusSearchInput.value = '';
    elements.focusDrawer.open = false;
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

function render() {
  const filtered = getFilteredSquads();
  const selected = pickSelectedSquad(filtered);

  elements.resultsSummary.textContent = buildResultsSummary(filtered.length);
  elements.emptyState.hidden = filtered.length > 0;

  renderStatusFilters();
  renderFocusFilters();
  renderCards(filtered, selected?.id ?? null);
  renderDetail(selected);
}

function renderStatusFilters() {
  const counts = getStatusCounts();
  const values = ['all', ...collectStatuses()];
  const allCount = state.squads
    .filter((squad) => matchesQuery(squad))
    .filter((squad) => state.focus.length === 0 || state.focus.some((focus) => squad.focus.includes(focus)))
    .length;

  elements.statusFilters.replaceChildren();

  values.forEach((value) => {
    const button = document.createElement('button');
    const count = value === 'all' ? allCount : counts.get(value) ?? 0;
    button.type = 'button';
    button.className = 'filter-chip';
    button.textContent = value === 'all' ? `All (${count})` : `${titleCase(value)} (${count})`;
    button.setAttribute('aria-pressed', String(value === state.status));
    button.addEventListener('click', () => {
      state.status = value;
      render();
    });
    elements.statusFilters.append(button);
  });
}

function renderFocusFilters() {
  const counts = getFocusCounts();
  const focusAreas = collectFocusAreas().map((focus) => ({
    name: focus,
    count: counts.get(focus) ?? 0,
  }));
  const availableFocusAreas = focusAreas.filter(({ count }) => count > 0);
  const sortedFocusAreas = focusAreas.sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }
    return left.name.localeCompare(right.name);
  });
  const filteredFocusAreas = sortedFocusAreas.filter(({ name, count }) => {
    const matchesFocusSearch = name.toLowerCase().includes(state.focusQuery);

    if (state.focusQuery) {
      return matchesFocusSearch;
    }

    return count > 0 || state.focus.includes(name);
  });
  const visibleFocusAreas =
    state.focusQuery.length > 0 ? filteredFocusAreas : filteredFocusAreas.slice(0, DEFAULT_VISIBLE_FOCUS);

  elements.focusSummary.textContent = `${availableFocusAreas.length} focus area${availableFocusAreas.length === 1 ? '' : 's'} available`;
  elements.focusSelectionCount.textContent = `${state.focus.length} selected`;

  renderSelectedFocusChips();
  elements.focusOptions.replaceChildren();

  visibleFocusAreas.forEach(({ name, count }) => {
    const label = document.createElement('label');
    label.className = 'focus-option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'focus';
    checkbox.value = name;
    checkbox.checked = state.focus.includes(name);
    checkbox.addEventListener('change', () => {
      toggleFocus(name);
    });

    const text = document.createElement('span');
    text.className = 'focus-option__text';
    text.textContent = name;

    const meta = document.createElement('span');
    meta.className = 'focus-option__count';
    meta.textContent = `${count}`;

    label.append(checkbox, text, meta);
    elements.focusOptions.append(label);
  });

  if (visibleFocusAreas.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'filter-empty';
    empty.textContent = 'No focus areas match that filter search.';
    elements.focusOptions.append(empty);
  } else if (!state.focusQuery && filteredFocusAreas.length > DEFAULT_VISIBLE_FOCUS) {
    const helper = document.createElement('p');
    helper.className = 'filter-helper';
    helper.textContent = `Showing the top ${DEFAULT_VISIBLE_FOCUS} focus areas. Search to reach the full list.`;
    elements.focusOptions.append(helper);
  }
}

function renderSelectedFocusChips() {
  elements.selectedFilters.replaceChildren();
  elements.selectedFilters.hidden = state.focus.length === 0;

  state.focus.forEach((focus) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-chip filter-chip--selected';
    button.textContent = `${focus} ×`;
    button.addEventListener('click', () => {
      toggleFocus(focus);
    });
    elements.selectedFilters.append(button);
  });
}

function renderCards(squads, selectedId) {
  elements.cardGrid.replaceChildren();

  squads.forEach((squad) => {
    const fragment = elements.cardTemplate.content.cloneNode(true);
    const article = fragment.querySelector('.squad-card');
    const button = fragment.querySelector('.squad-card__button');
    const badge = fragment.querySelector('.badge');

    article.dataset.selected = String(squad.id === selectedId);
    button.setAttribute('aria-pressed', String(squad.id === selectedId));
    fragment.querySelector('.squad-card__eyebrow').textContent = squad.sourceLabel;
    fragment.querySelector('.squad-card__title').textContent = squad.name;
    fragment.querySelector('.squad-card__tagline').textContent = squad.tagline;
    fragment.querySelector('.squad-card__summary').textContent = squad.summary;
    badge.textContent = squad.status;
    badge.dataset.tone = squad.status;
    fragment.querySelector('.meta-members').textContent = String(squad.members.length);
    fragment.querySelector('.meta-source').textContent = squad.source.manifestPath;

    const chips = fragment.querySelector('.squad-card__chips');
    const visibleFocus = squad.focus.slice(0, 2);
    visibleFocus.forEach((focus) => {
      chips.append(createChip(focus));
    });

    const hiddenCount = Math.max(squad.focus.length - visibleFocus.length, 0);
    if (hiddenCount > 0) {
      chips.append(createChip(`+${hiddenCount} more`, 'filter-chip filter-chip--muted'));
    }

    const memberPreview = fragment.querySelector('.member-preview');
    squad.members.slice(0, 2).forEach((member) => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>${member.name}</strong><span>${member.role}</span>`;
      memberPreview.append(item);
    });

    if (squad.members.length > 2) {
      const overflow = document.createElement('li');
      overflow.className = 'member-preview__overflow';
      overflow.textContent = `+${squad.members.length - 2} more`;
      memberPreview.append(overflow);
    }

    button.addEventListener('click', () => {
      state.selectedId = squad.id;
      window.location.hash = `squad/${squad.id}`;
      render();
      elements.detailPanel?.scrollIntoView({ block: 'start', behavior: 'smooth' });
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
  elements.detailContent.replaceChildren();

  const header = document.createElement('section');
  header.innerHTML = `
    <div class="detail__header">
      <div>
        <p class="eyebrow">${squad.sourceLabel}</p>
        <h3>${squad.name}</h3>
        <p class="detail__summary">${squad.summary}</p>
      </div>
      <span class="badge" data-tone="${squad.status}">${squad.status}</span>
    </div>
    <p class="detail__mission">${squad.howTheyWork}</p>
  `;

  const meta = document.createElement('section');
  meta.innerHTML = `
    <div class="detail__meta">
      <div>
        <p class="detail__label">Members</p>
        <p class="detail__value">${squad.members.length}</p>
      </div>
      <div>
        <p class="detail__label">Manifest path</p>
        <p class="detail__value">${squad.source.manifestPath}</p>
      </div>
      <div>
        <p class="detail__label">Directory</p>
        <p class="detail__value">${squad.location}</p>
      </div>
    </div>
  `;

  const focusSection = document.createElement('section');
  const focusTitle = document.createElement('h4');
  focusTitle.className = 'detail__section-title';
  focusTitle.textContent = 'Focus areas';
  const focusIntro = document.createElement('p');
  focusIntro.className = 'detail__section-copy';
  focusIntro.textContent = 'Click a focus area to filter the directory without losing the current deep link.';
  const focusChips = document.createElement('div');
  focusChips.className = 'chip-row detail__chips';

  squad.focus.forEach((focus) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-chip';
    button.textContent = focus;
    button.setAttribute('aria-pressed', String(state.focus.includes(focus)));
    button.addEventListener('click', () => {
      toggleFocus(focus);
      elements.focusDrawer.open = true;
      document.querySelector('#directory')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
    focusChips.append(button);
  });

  focusSection.append(focusTitle, focusIntro, focusChips);

  const rosterSection = document.createElement('section');
  rosterSection.innerHTML = '<h4 class="detail__section-title">Roster</h4>';
  const roster = document.createElement('ul');
  roster.className = 'detail__members';
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
  rosterSection.append(roster);

  const linksSection = document.createElement('section');
  linksSection.innerHTML = '<h4 class="detail__section-title">Useful links</h4>';
  const links = document.createElement('ul');
  links.className = 'detail__links';
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
  linksSection.append(links);

  elements.detailContent.append(header, meta, focusSection, rosterSection, linksSection);
}

function getFilteredSquads() {
  return [...state.squads]
    .filter((squad) => {
      const matchesStatus = state.status === 'all' || squad.status === state.status;
      const matchesFocus =
        state.focus.length === 0 || state.focus.some((focus) => squad.focus.includes(focus));

      return matchesQuery(squad) && matchesStatus && matchesFocus;
    })
    .sort((left, right) => {
      const statusDifference = statusOrder.indexOf(left.status) - statusOrder.indexOf(right.status);
      if (statusDifference !== 0) {
        return statusDifference;
      }
      return left.name.localeCompare(right.name);
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

function buildResultsSummary(filteredCount) {
  const parts = [`Showing ${filteredCount} of ${state.squads.length} squad${state.squads.length === 1 ? '' : 's'}`];
  const query = state.query.trim();

  if (query) {
    parts.push(`query “${query}”`);
  }

  if (state.status !== 'all') {
    parts.push(`status ${titleCase(state.status)}`);
  }

  if (state.focus.length > 0) {
    parts.push(`${state.focus.length} focus filter${state.focus.length === 1 ? '' : 's'}`);
  }

  return parts.join(' • ');
}

function getStatusCounts() {
  const counts = new Map();

  state.squads
    .filter((squad) => matchesQuery(squad))
    .filter((squad) => state.focus.length === 0 || state.focus.some((focus) => squad.focus.includes(focus)))
    .forEach((squad) => {
      counts.set(squad.status, (counts.get(squad.status) ?? 0) + 1);
    });

  return counts;
}

function getFocusCounts() {
  const counts = new Map();

  state.squads
    .filter((squad) => matchesQuery(squad))
    .filter((squad) => state.status === 'all' || squad.status === state.status)
    .forEach((squad) => {
      squad.focus.forEach((focus) => {
        counts.set(focus, (counts.get(focus) ?? 0) + 1);
      });
    });

  return counts;
}

function matchesQuery(squad) {
  const query = state.query.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return [
    squad.name,
    squad.tagline,
    squad.summary,
    squad.howTheyWork,
    squad.sourceLabel,
    squad.location,
    squad.focus.join(' '),
    squad.members.map((member) => `${member.name} ${member.role} ${member.expertise.join(' ')}`).join(' '),
  ]
    .join(' ')
    .toLowerCase()
    .includes(query);
}

function toggleFocus(focus) {
  if (state.focus.includes(focus)) {
    state.focus = state.focus.filter((entry) => entry !== focus);
  } else {
    state.focus = [...state.focus, focus];
  }
  render();
}

function syncSearchInputs() {
  const query = state.query;
  if (elements.heroSearchInput.value !== query) {
    elements.heroSearchInput.value = query;
  }
  if (elements.searchInput.value !== query) {
    elements.searchInput.value = query;
  }
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
  return [...new Set(state.squads.flatMap((squad) => squad.focus))];
}

function createChip(label, className = 'filter-chip') {
  const chip = document.createElement('span');
  chip.className = className;
  chip.textContent = label;
  chip.setAttribute('aria-hidden', 'true');
  return chip;
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
