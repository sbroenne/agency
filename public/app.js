const DATA_URL = './squads.json';

const state = {
  squads: [],
  query: '',
  selectedSlug: getSelectedSlug(),
};

const elements = {
  searchForm: document.querySelector('#directory-search'),
  searchInput: document.querySelector('#search-input'),
  resetSearch: document.querySelector('#reset-search'),
  resultsSummary: document.querySelector('#results-summary'),
  emptyState: document.querySelector('#empty-state'),
  squadList: document.querySelector('#squad-list'),
  squadTemplate: document.querySelector('#squad-template'),
};

initialize().catch((error) => {
  console.error(error);
  elements.resultsSummary.textContent = 'Unable to load squads right now.';
  elements.emptyState.hidden = false;
  elements.emptyState.querySelector('p').textContent = 'Please try again after the registry feed is available.';
});

async function initialize() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Failed to load ${DATA_URL}: ${response.status}`);
  }

  const payload = await response.json();
  state.squads = Array.isArray(payload.squads) ? payload.squads : [];

  bindEvents();
  render();
  focusSelectedCard(false);
}

function bindEvents() {
  elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  elements.searchInput.addEventListener('input', (event) => {
    state.query = event.target.value;
    render();
  });

  elements.resetSearch.addEventListener('click', () => {
    state.query = '';
    elements.searchInput.value = '';
    render();
    elements.searchInput.focus();
  });

  window.addEventListener('hashchange', () => {
    state.selectedSlug = getSelectedSlug();
    render();
    focusSelectedCard(true);
  });
}

function render() {
  const squads = getFilteredSquads();

  elements.resultsSummary.textContent = buildResultsSummary(squads.length);
  elements.resetSearch.hidden = state.query.trim().length === 0;
  elements.emptyState.hidden = squads.length > 0;

  renderSquads(squads);
}

function renderSquads(squads) {
  elements.squadList.replaceChildren();

  squads.forEach((squad) => {
    const fragment = elements.squadTemplate.content.cloneNode(true);
    const card = fragment.querySelector('.squad-card');
    const targetHash = `#squad/${squad.slug}`;

    card.id = `squad-${squad.slug}`;
    card.dataset.selected = String(squad.slug === state.selectedSlug);

    fragment.querySelector('.squad-card__source').textContent = squad.sourceLabel;
    fragment.querySelector('.squad-card__title').textContent = squad.name;
    fragment.querySelector('.squad-card__jump').href = targetHash;
    fragment.querySelector('.squad-card__tagline').textContent = squad.tagline;
    fragment.querySelector('.squad-card__summary').textContent = squad.summary;
    fragment.querySelector('.squad-card__mission').textContent = squad.howTheyWork;
    fragment.querySelector('.squad-card__location').textContent = `Directory: ${squad.location}`;
    fragment.querySelector('.squad-card__manifest').textContent = `Manifest: ${squad.source.manifestPath}`;

    const status = fragment.querySelector('.status-pill');
    status.textContent = titleCase(squad.status);
    status.dataset.tone = squad.status;

    const focusList = fragment.querySelector('.squad-card__focus');
    squad.focus.forEach((focus) => {
      const item = document.createElement('li');
      item.className = 'token';
      item.textContent = focus;
      focusList.append(item);
    });

    const members = fragment.querySelector('.member-list');
    squad.members.forEach((member) => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>${member.name}</strong><span>${member.role}</span>`;
      members.append(item);
    });

    const homepageLink = fragment.querySelector('.squad-homepage');
    homepageLink.href = squad.source.homepage ?? squad.links[0]?.url ?? squad.source.repository;

    const repositoryLink = fragment.querySelector('.squad-repository');
    repositoryLink.href = squad.source.repository;

    elements.squadList.append(fragment);
  });
}

function getFilteredSquads() {
  const query = state.query.trim().toLowerCase();

  if (!query) {
    return [...state.squads];
  }

  return state.squads.filter((squad) => {
    return [
      squad.name,
      squad.tagline,
      squad.summary,
      squad.howTheyWork,
      squad.sourceLabel,
      squad.location,
      squad.focus.join(' '),
      squad.source.repository,
      squad.members.map((member) => `${member.name} ${member.role} ${member.expertise.join(' ')}`).join(' '),
    ]
      .join(' ')
      .toLowerCase()
      .includes(query);
  });
}

function buildResultsSummary(count) {
  const total = state.squads.length;
  const query = state.query.trim();

  if (!query) {
    return `${total} published squad${total === 1 ? '' : 's'}`;
  }

  return `${count} match${count === 1 ? '' : 'es'} for “${query}”`;
}

function getSelectedSlug() {
  const match = window.location.hash.match(/^#squad\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function focusSelectedCard(shouldScroll) {
  if (!state.selectedSlug) {
    return;
  }

  const card = document.querySelector(`#squad-${CSS.escape(state.selectedSlug)}`);
  if (!card) {
    return;
  }

  if (shouldScroll) {
    card.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  card.focus({ preventScroll: true });
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
