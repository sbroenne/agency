const squads = JSON.parse(document.querySelector('#registry-data')?.textContent ?? '[]');
const cards = [...document.querySelectorAll('[data-squad-card]')];

const state = {
  query: '',
  statusFilter: 'all',
  focusFilters: new Set(),
  lastActiveCard: null,
};

const elements = {
  searchForm: document.querySelector('#hero-search'),
  searchInput: document.querySelector('#search-input'),
  resetSearch: document.querySelector('#reset-search'),
  resultsSummary: document.querySelector('#results-summary'),
  emptyState: document.querySelector('#empty-state'),
  modal: document.querySelector('#squad-modal'),
  modalBackdrop: document.querySelector('[data-modal-backdrop]'),
  modalClose: document.querySelector('[data-modal-close]'),
  // Filter elements
  statusFilters: document.querySelectorAll('[data-status-filter]'),
  focusToggle: document.querySelector('#focus-toggle'),
  focusToggleIcon: document.querySelector('#focus-toggle-icon'),
  focusContent: document.querySelector('#focus-filter-content'),
  focusSearch: document.querySelector('#focus-search'),
  focusChips: document.querySelectorAll('[data-focus-filter]'),
  focusShowMore: document.querySelector('#focus-show-more'),
  focusClear: document.querySelector('#focus-clear'),
};

bindEvents();
render();

function bindEvents() {
  elements.searchForm?.addEventListener('submit', (event) => event.preventDefault());

  elements.searchInput?.addEventListener('input', (event) => {
    state.query = event.target.value;
    render();
  });

  elements.resetSearch?.addEventListener('click', () => {
    state.query = '';
    if (elements.searchInput) {
      elements.searchInput.value = '';
      elements.searchInput.focus();
    }
    render();
  });

  // Tier 1: Status filter chips
  elements.statusFilters.forEach((chip) => {
    chip.addEventListener('click', () => {
      state.statusFilter = chip.dataset.statusFilter;
      updateStatusChipStates();
      render();
    });
  });

  // Tier 2: Focus panel toggle
  elements.focusToggle?.addEventListener('click', () => {
    const isExpanded = elements.focusContent?.classList.toggle('hidden') === false;
    elements.focusToggle.setAttribute('aria-expanded', String(isExpanded));
    elements.focusToggleIcon?.classList.toggle('rotate-90', isExpanded);
  });

  // Tier 2: Focus area search
  elements.focusSearch?.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase().trim();
    elements.focusChips.forEach((chip) => {
      const focusName = chip.dataset.focusFilter.toLowerCase();
      const matchesSearch = !searchTerm || focusName.includes(searchTerm);
      chip.classList.toggle('hidden', !matchesSearch);
      // When searching, show all matching chips regardless of overflow state
      if (searchTerm && matchesSearch) {
        chip.classList.remove('focus-chip--overflow');
      }
    });
    // Hide show-more when searching
    if (elements.focusShowMore) {
      elements.focusShowMore.hidden = !!searchTerm;
    }
  });

  // Tier 2: Focus chip selection (multi-select)
  elements.focusChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const focus = chip.dataset.focusFilter;
      if (state.focusFilters.has(focus)) {
        state.focusFilters.delete(focus);
        delete chip.dataset.active;
      } else {
        state.focusFilters.add(focus);
        chip.dataset.active = '';
      }
      updateFocusClearVisibility();
      render();
    });
  });

  // Tier 2: Show more/less focus chips
  elements.focusShowMore?.addEventListener('click', () => {
    const overflowChips = document.querySelectorAll('.focus-chip--overflow');
    const isShowingAll = elements.focusShowMore.textContent.includes('fewer');
    overflowChips.forEach((chip) => {
      chip.classList.toggle('hidden', isShowingAll);
    });
    const totalCount = elements.focusChips.length;
    elements.focusShowMore.textContent = isShowingAll
      ? `Show all (${totalCount})`
      : 'Show fewer';
  });

  // Tier 2: Clear focus filters
  elements.focusClear?.addEventListener('click', () => {
    state.focusFilters.clear();
    elements.focusChips.forEach((chip) => delete chip.dataset.active);
    updateFocusClearVisibility();
    render();
  });

  cards.forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        return;
      }
      openModal(Number(card.dataset.index), card);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(Number(card.dataset.index), card);
      }
    });
  });

  elements.modalBackdrop?.addEventListener('click', closeModal);
  elements.modalClose?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && elements.modal && !elements.modal.hidden) {
      closeModal();
    }
  });
}

function updateStatusChipStates() {
  elements.statusFilters.forEach((chip) => {
    if (chip.dataset.statusFilter === state.statusFilter) {
      chip.dataset.active = '';
    } else {
      delete chip.dataset.active;
    }
  });
}

function updateFocusClearVisibility() {
  if (elements.focusClear) {
    elements.focusClear.classList.toggle('hidden', state.focusFilters.size === 0);
  }
}

function render() {
  const query = state.query.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesSearch = !query || card.dataset.search?.includes(query);

    // Status filter
    const cardStatus = card.dataset.status;
    const matchesStatus = state.statusFilter === 'all' || cardStatus === state.statusFilter;

    // Focus filter (multi-select: card must have ALL selected focuses)
    const cardFocuses = card.dataset.focus?.split(',') ?? [];
    const matchesFocus = state.focusFilters.size === 0 ||
      [...state.focusFilters].every(f => cardFocuses.includes(f));

    const isVisible = matchesSearch && matchesStatus && matchesFocus;
    card.hidden = !isVisible;
    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (elements.resultsSummary) {
    elements.resultsSummary.textContent = buildSummary(visibleCount, query);
  }

  if (elements.resetSearch) {
    elements.resetSearch.hidden = query.length === 0;
  }

  if (elements.emptyState) {
    elements.emptyState.hidden = visibleCount > 0;
  }
}

function buildSummary(visibleCount, query) {
  const parts = [];

  // Build filter context
  if (state.statusFilter !== 'all') {
    parts.push(state.statusFilter);
  }
  if (state.focusFilters.size > 0) {
    parts.push([...state.focusFilters].join(', '));
  }

  if (!query && parts.length === 0) {
    return `${squads.length} squad${squads.length === 1 ? '' : 's'} published`;
  }

  const filterContext = parts.length > 0 ? ` in ${parts.join(' + ')}` : '';

  if (query) {
    return `${visibleCount} result${visibleCount === 1 ? '' : 's'} for "${query}"${filterContext}`;
  }

  return `${visibleCount} squad${visibleCount === 1 ? '' : 's'}${filterContext}`;
}

function openModal(index, card) {
  const squad = squads[index];
  const modal = elements.modal;
  if (!squad || !modal) {
    return;
  }

  state.lastActiveCard = card;

  const status = modal.querySelector('#modal-status');
  status.textContent = titleCase(squad.status);
  status.className = 'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide';
  if (squad.status === 'live') {
    status.classList.add('border', 'border-green-200', 'bg-green-50', 'text-green-700');
  } else if (squad.status === 'building') {
    status.classList.add('border', 'border-squad-200', 'bg-squad-50', 'text-squad-700');
  } else {
    status.classList.add('border', 'border-surface-200', 'bg-surface-100', 'text-surface-600');
  }

  modal.querySelector('#modal-source').textContent = squad.sourceLabel;
  modal.querySelector('#modal-title').textContent = squad.name;
  modal.querySelector('#modal-tagline').textContent = squad.tagline;
  modal.querySelector('#modal-summary').textContent = squad.summary;
  modal.querySelector('#modal-mission').textContent = squad.howTheyWork;

  const focusList = modal.querySelector('#modal-focus');
  focusList.replaceChildren();
  squad.focus.forEach((focus) => {
    const item = document.createElement('li');
    item.className = 'rounded-md border border-surface-200 bg-surface-50 px-2.5 py-1 text-sm text-surface-600';
    item.textContent = focus;
    focusList.append(item);
  });

  const memberList = modal.querySelector('#modal-members');
  memberList.replaceChildren();
  squad.members.forEach((member) => {
    const item = document.createElement('li');
    item.className = 'rounded-lg border border-surface-200 bg-surface-50 px-3 py-2';

    const name = document.createElement('strong');
    name.className = 'block text-sm font-semibold text-surface-900';
    name.textContent = member.name;

    const role = document.createElement('span');
    role.className = 'mt-0.5 block text-xs text-surface-500';
    role.textContent = member.role;

    item.append(name, role);
    memberList.append(item);
  });

  const repoLink = modal.querySelector('#modal-repo');
  repoLink.href = squad.source.repository;

  const homepageLink = modal.querySelector('#modal-homepage');
  const homepage = squad.source.homepage || squad.links?.[0]?.url || squad.source.repository;
  homepageLink.href = homepage;
  homepageLink.hidden = !homepage;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  elements.modalClose?.focus();
}

function closeModal() {
  if (!elements.modal) {
    return;
  }

  elements.modal.hidden = true;
  document.body.style.overflow = '';
  state.lastActiveCard?.focus();
  state.lastActiveCard = null;
}

function titleCase(value) {
  return value.replace(/\b\w/g, (character) => character.toUpperCase());
}
