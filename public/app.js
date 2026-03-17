const DATA_URL = './squads.json';

const state = {
  squads: [],
  query: '',
};

const elements = {
  searchForm: document.querySelector('#hero-search'),
  searchInput: document.querySelector('#search-input'),
  resetSearch: document.querySelector('#reset-search'),
  resultsSummary: document.querySelector('#results-summary'),
  emptyState: document.querySelector('#empty-state'),
  squadList: document.querySelector('#squad-list'),
  squadTemplate: document.querySelector('#squad-template'),
  modal: document.querySelector('#squad-modal'),
  modalBackdrop: document.querySelector('.modal__backdrop'),
  modalClose: document.querySelector('.modal__close'),
};

initialize().catch((error) => {
  console.error(error);
  elements.resultsSummary.textContent = 'Unable to load squads.';
  elements.emptyState.hidden = false;
});

async function initialize() {
  const response = await fetch(DATA_URL);
  if (!response.ok) throw new Error(`Failed to load ${DATA_URL}`);

  const payload = await response.json();
  state.squads = Array.isArray(payload.squads) ? payload.squads : [];

  bindEvents();
  render();
}

function bindEvents() {
  elements.searchForm.addEventListener('submit', (e) => e.preventDefault());

  elements.searchInput.addEventListener('input', (e) => {
    state.query = e.target.value;
    render();
  });

  elements.resetSearch.addEventListener('click', () => {
    state.query = '';
    elements.searchInput.value = '';
    render();
    elements.searchInput.focus();
  });

  elements.modalBackdrop?.addEventListener('click', closeModal);
  elements.modalClose?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !elements.modal.hidden) closeModal();
  });
}

function render() {
  const squads = getFilteredSquads();

  elements.resultsSummary.textContent = buildSummary(squads.length);
  elements.resetSearch.hidden = !state.query.trim();
  elements.emptyState.hidden = squads.length > 0;

  renderSquads(squads);
}

function renderSquads(squads) {
  elements.squadList.replaceChildren();

  squads.forEach((squad) => {
    const fragment = elements.squadTemplate.content.cloneNode(true);
    const card = fragment.querySelector('.squad-card');

    card.id = `squad-${squad.slug}`;

    fragment.querySelector('.squad-card__source').textContent = squad.sourceLabel;
    fragment.querySelector('.squad-card__title').textContent = squad.name;
    fragment.querySelector('.squad-card__tagline').textContent = squad.tagline;

    const status = fragment.querySelector('.status-pill');
    status.textContent = titleCase(squad.status);
    status.dataset.tone = squad.status;

    const focusList = fragment.querySelector('.squad-card__focus');
    squad.focus.slice(0, 3).forEach((f) => {
      const li = document.createElement('li');
      li.textContent = f;
      focusList.append(li);
    });
    if (squad.focus.length > 3) {
      const li = document.createElement('li');
      li.textContent = `+${squad.focus.length - 3}`;
      focusList.append(li);
    }

    fragment.querySelector('.squad-card__members').textContent =
      `${squad.members.length} member${squad.members.length !== 1 ? 's' : ''}`;

    const link = fragment.querySelector('.squad-card__link');
    link.href = squad.source.repository;

    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      openModal(squad);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(squad);
      }
    });

    elements.squadList.append(fragment);
  });
}

function openModal(squad) {
  const m = elements.modal;
  m.querySelector('#modal-status').textContent = titleCase(squad.status);
  m.querySelector('#modal-status').dataset.tone = squad.status;
  m.querySelector('#modal-source').textContent = squad.sourceLabel;
  m.querySelector('#modal-title').textContent = squad.name;
  m.querySelector('#modal-tagline').textContent = squad.tagline;
  m.querySelector('#modal-summary').textContent = squad.summary;
  m.querySelector('#modal-mission').textContent = squad.howTheyWork;

  const focusList = m.querySelector('#modal-focus');
  focusList.replaceChildren();
  squad.focus.forEach((f) => {
    const li = document.createElement('li');
    li.textContent = f;
    focusList.append(li);
  });

  const membersList = m.querySelector('#modal-members');
  membersList.replaceChildren();
  squad.members.forEach((mem) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${mem.name}</strong><span>${mem.role}</span>`;
    membersList.append(li);
  });

  m.querySelector('#modal-repo').href = squad.source.repository;
  m.querySelector('#modal-homepage').href =
    squad.source.homepage || squad.links?.[0]?.url || squad.source.repository;

  m.hidden = false;
  document.body.style.overflow = 'hidden';
  elements.modalClose.focus();
}

function closeModal() {
  elements.modal.hidden = true;
  document.body.style.overflow = '';
}

function getFilteredSquads() {
  const q = state.query.trim().toLowerCase();
  if (!q) return [...state.squads];

  return state.squads.filter((s) =>
    [
      s.name,
      s.tagline,
      s.summary,
      s.howTheyWork,
      s.sourceLabel,
      s.focus.join(' '),
      s.members.map((m) => `${m.name} ${m.role}`).join(' '),
    ]
      .join(' ')
      .toLowerCase()
      .includes(q)
  );
}

function buildSummary(count) {
  const total = state.squads.length;
  const q = state.query.trim();
  if (!q) return `${total} squad${total !== 1 ? 's' : ''} published`;
  return `${count} result${count !== 1 ? 's' : ''} for "${q}"`;
}

function titleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}
