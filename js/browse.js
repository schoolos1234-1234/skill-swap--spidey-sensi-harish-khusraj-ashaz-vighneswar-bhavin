/* =========================================================
   SkillSwap — browse & search page behavior
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  var S = window.SkillSwap;
  var qs = S.qs, qsa = S.qsa;

  var grid = qs('#results-grid');
  var countEl = qs('#results-count');
  var emptyState = qs('#empty-state');
  var searchInput = qs('#search-input');
  var sortSelect = qs('#sort-select');
  var chipsWrap = qs('#category-chips');
  var clearBtn = qs('#clear-filters');
  var loadMoreBtn = qs('#load-more');
  var filterToggle = qs('#filter-toggle');
  var filterPanel = qs('#filters-panel');
  var modal = qs('#skill-modal');

  var PAGE_SIZE = 9;
  var visibleCount = PAGE_SIZE;
  var all = S.getAllSkills();

  var params = new URLSearchParams(location.search);
  var state = { q: params.get('q') || '', category: params.get('category') || 'all', level: 'all', sort: 'newest' };
  if (searchInput) searchInput.value = state.q;

  function buildChips() {
    var cats = [{ slug: 'all', name: 'All Skills', icon: '✨' }].concat(S.CATEGORIES);
    chipsWrap.innerHTML = cats.map(function (c) {
      return '<button type="button" class="chip-filter" data-cat="' + c.slug + '" aria-pressed="' + (state.category === c.slug) + '">' +
        c.icon + ' ' + c.name + '</button>';
    }).join('');
  }

  function applyFilters() {
    var list = all.slice();
    if (state.q) {
      var q = state.q.toLowerCase();
      list = list.filter(function (s) {
        return (s.title || '').toLowerCase().indexOf(q) > -1 ||
          (s.description || '').toLowerCase().indexOf(q) > -1 ||
          (s.offeredBy || '').toLowerCase().indexOf(q) > -1 ||
          (s.tags || []).some(function (t) { return t.toLowerCase().indexOf(q) > -1; });
      });
    }
    if (state.category !== 'all') list = list.filter(function (s) { return s.category === state.category; });
    if (state.level !== 'all') list = list.filter(function (s) { return s.level === state.level; });

    if (state.sort === 'az') list.sort(function (a, b) { return a.title.localeCompare(b.title); });
    else if (state.sort === 'rating') list.sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });
    else list.sort(function (a, b) { return new Date(b.createdAt || 0) - new Date(a.createdAt || 0); });

    return list;
  }

  function updateUrl() {
    var url = new URL(location.href);
    state.q ? url.searchParams.set('q', state.q) : url.searchParams.delete('q');
    state.category !== 'all' ? url.searchParams.set('category', state.category) : url.searchParams.delete('category');
    history.replaceState(null, '', url);
  }

  function render() {
    var filtered = applyFilters();
    var shown = Math.min(visibleCount, filtered.length);
    countEl.textContent = filtered.length
      ? ('Showing ' + shown + ' of ' + filtered.length + ' skill' + (filtered.length !== 1 ? 's' : ''))
      : 'No skills match your filters';
    var slice = filtered.slice(0, visibleCount);
    grid.innerHTML = slice.map(function (s) { return S.renderSkillCard(s); }).join('');
    grid.hidden = filtered.length === 0;
    emptyState.hidden = filtered.length !== 0;
    loadMoreBtn.hidden = filtered.length <= visibleCount;

    qsa('.chip-filter', chipsWrap).forEach(function (ch) { ch.setAttribute('aria-pressed', String(ch.dataset.cat === state.category)); });

    qsa('.skill-card', grid).forEach(function (card) {
      card.addEventListener('click', function () { showDetail(card.getAttribute('data-id')); });
      card.addEventListener('keydown', function (e) { if (e.key === 'Enter') showDetail(card.getAttribute('data-id')); });
    });

    S.initReveal();
    updateUrl();
  }

  function renderDetail(skill) {
    var cat = S.categoryMeta(skill.category);
    var initials = S.initialsOf(skill.offeredBy);
    var avColor = S.colorIndexOf(skill.offeredBy || skill.title);
    return (
      '<div class="modal-detail-head">' +
        '<span class="skill-icon cat-icon-' + cat.color + '" style="width:64px;height:64px;font-size:1.8rem">' + (skill.icon || cat.icon) + '</span>' +
        '<div>' +
          '<span class="chip chip-' + cat.color + '">' + cat.icon + ' ' + S.escapeHTML(cat.name) + '</span>' +
          '<h2 style="margin-top:10px">' + S.escapeHTML(skill.title) + '</h2>' +
        '</div>' +
      '</div>' +
      '<div class="modal-detail-body">' +
        '<div class="skill-meta">' +
          '<span class="badge ' + (skill.level === 'Intermediate' ? 'lvl-intermediate' : skill.level === 'Expert' ? 'lvl-expert' : 'lvl-beginner') + '">' + S.escapeHTML(skill.level) + '</span>' +
          '<span class="skill-rating">★ ' + Number(skill.rating || 4.8).toFixed(1) + '</span>' +
          (skill.swaps != null ? '<span style="color:var(--text-muted);font-size:.88rem">' + skill.swaps + ' completed swaps</span>' : '') +
        '</div>' +
        '<p>' + S.escapeHTML(skill.description) + '</p>' +
        '<div class="skill-exchange"><strong>Wants in exchange:</strong> ' + S.escapeHTML(skill.wantInExchange) + '</div>' +
      '</div>' +
      '<div class="modal-detail-footer">' +
        '<div class="skill-footer" style="border:none;padding:0">' +
          '<span class="avatar avatar-md avatar-c' + avColor + '">' + S.escapeHTML(initials) + '</span>' +
          '<div><span class="skill-owner" style="display:block">' + S.escapeHTML(skill.offeredBy) + '</span>' +
          '<span style="color:var(--text-muted);font-size:.8rem">' + (skill.createdAt ? 'Posted ' + S.timeAgo(skill.createdAt) : '') + '</span></div>' +
        '</div>' +
        '<button type="button" class="btn btn-primary" id="modal-request-btn" data-autofocus>Request This Swap</button>' +
      '</div>'
    );
  }

  function showDetail(id) {
    var skill = all.find(function (s) { return String(s.id) === String(id); });
    if (!skill) return;
    qs('#modal-body', modal).innerHTML = renderDetail(skill);
    S.openModal(modal);
    qs('#modal-request-btn', modal).addEventListener('click', function () {
      S.closeModal(modal);
      S.toast('Swap request sent to ' + skill.offeredBy + '! 🎉');
    });
  }

  buildChips();
  render();

  chipsWrap.addEventListener('click', function (e) {
    var btn = e.target.closest('.chip-filter');
    if (!btn) return;
    state.category = btn.dataset.cat;
    visibleCount = PAGE_SIZE;
    render();
  });

  if (searchInput) {
    searchInput.addEventListener('input', S.debounce(function (e) {
      state.q = e.target.value;
      visibleCount = PAGE_SIZE;
      render();
    }, 250));
  }

  sortSelect.addEventListener('change', function (e) { state.sort = e.target.value; render(); });

  qsa('input[name="level"]').forEach(function (inp) {
    inp.addEventListener('change', function () {
      var checked = qsa('input[name="level"]:checked')[0];
      state.level = checked ? checked.value : 'all';
      visibleCount = PAGE_SIZE;
      render();
    });
  });

  clearBtn.addEventListener('click', function () {
    state = { q: '', category: 'all', level: 'all', sort: 'newest' };
    if (searchInput) searchInput.value = '';
    qsa('input[name="level"]').forEach(function (i) { i.checked = (i.value === 'all'); });
    sortSelect.value = 'newest';
    visibleCount = PAGE_SIZE;
    buildChips();
    render();
  });

  loadMoreBtn.addEventListener('click', function () { visibleCount += PAGE_SIZE; render(); });

  if (filterToggle && filterPanel) {
    filterToggle.addEventListener('click', function () {
      var open = filterPanel.classList.toggle('open');
      filterToggle.setAttribute('aria-expanded', String(open));
    });
  }
});
