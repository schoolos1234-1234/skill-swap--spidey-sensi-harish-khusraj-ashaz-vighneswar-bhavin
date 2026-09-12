/* =========================================================
   SkillSwap — profile page behavior
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  var S = window.SkillSwap;
  var qs = S.qs, qsa = S.qsa;
  if (!qs('#profile-name')) return;

  /* ---- Profile header ---- */
  function renderProfile() {
    var p = S.getProfile();
    qs('#profile-name').textContent = p.name;
    qs('#profile-tagline').textContent = p.tagline;
    qs('#profile-location').textContent = p.location;
    qs('#profile-bio').textContent = p.bio;
    var avatar = qs('#profile-avatar');
    avatar.textContent = p.initials;
    avatar.className = 'avatar avatar-xl avatar-c' + p.colorIndex;
    var since = new Date(p.memberSince);
    qs('#profile-since').textContent = isNaN(since) ? p.memberSince : since.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  }
  renderProfile();

  var editModal = qs('#edit-modal');
  qs('#edit-profile-btn').addEventListener('click', function () {
    var p = S.getProfile();
    qs('#edit-name').value = p.name;
    qs('#edit-tagline').value = p.tagline;
    qs('#edit-location').value = p.location;
    qs('#edit-bio').value = p.bio;
    S.openModal(editModal);
  });
  qs('#edit-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var p = S.getProfile();
    var newName = qs('#edit-name').value.trim();
    p.name = newName || p.name;
    p.tagline = qs('#edit-tagline').value.trim();
    p.location = qs('#edit-location').value.trim();
    p.bio = qs('#edit-bio').value.trim();
    p.initials = S.initialsOf(p.name);
    p.colorIndex = S.colorIndexOf(p.name);
    S.saveProfile(p);
    renderProfile();
    S.closeModal(editModal);
    S.toast('Profile updated!');
  });

  /* ---- Tabs ---- */
  var tabButtons = qsa('.tab-btn');
  var panels = qsa('.tab-panel');
  var indicator = qs('.tab-indicator');
  function activate(tab) {
    tabButtons.forEach(function (b) { b.classList.toggle('active', b.dataset.tab === tab); });
    panels.forEach(function (p) { p.classList.toggle('active', p.id === 'panel-' + tab); });
    var btn = tabButtons.filter(function (b) { return b.dataset.tab === tab; })[0];
    if (btn && indicator) { indicator.style.width = btn.offsetWidth + 'px'; indicator.style.left = btn.offsetLeft + 'px'; }
    S.initReveal();
  }
  tabButtons.forEach(function (b) { b.addEventListener('click', function () { activate(b.dataset.tab); }); });
  window.addEventListener('resize', S.debounce(function () {
    var cur = tabButtons.filter(function (b) { return b.classList.contains('active'); })[0];
    if (cur) activate(cur.dataset.tab);
  }, 150));

  /* ---- My Skills ---- */
  function renderMySkills() {
    var mine = S.getPostedSkills();
    var grid = qs('#my-skills-grid');
    var empty = qs('#my-skills-empty');
    grid.innerHTML = mine.map(function (s) { return S.renderSkillCard(s, { deletable: true }); }).join('');
    grid.hidden = mine.length === 0;
    empty.hidden = mine.length > 0;
    qs('#stat-skills').textContent = mine.length;
    S.initReveal();
  }
  qs('#my-skills-grid').addEventListener('click', function (e) {
    var del = e.target.closest('[data-delete-id]');
    if (!del) return;
    e.stopPropagation();
    S.deletePostedSkill(del.dataset.deleteId);
    renderMySkills();
    renderAchievements();
    S.toast('Skill removed.');
  });
  renderMySkills();

  /* ---- Wishlist ---- */
  function renderWishlist() {
    var list = S.getWishlist();
    var ul = qs('#wishlist-list');
    var empty = qs('#wishlist-empty');
    ul.innerHTML = list.map(function (w, i) {
      return '<li class="wishlist-item">' + S.escapeHTML(w) + '<button type="button" data-i="' + i + '" aria-label="Remove ' + S.escapeHTML(w) + '">✕</button></li>';
    }).join('');
    ul.hidden = list.length === 0;
    empty.hidden = list.length > 0;
    qs('#stat-wishlist').textContent = list.length;
  }
  qs('#wishlist-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = qs('#wishlist-input');
    var v = input.value.trim();
    if (!v) return;
    var list = S.getWishlist();
    list.push(v);
    S.saveWishlist(list);
    input.value = '';
    renderWishlist();
    renderAchievements();
    S.toast('Added to your wishlist!');
  });
  qs('#wishlist-list').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-i]');
    if (!b) return;
    var list = S.getWishlist();
    list.splice(+b.dataset.i, 1);
    S.saveWishlist(list);
    renderWishlist();
    renderAchievements();
  });
  renderWishlist();

  /* ---- Achievements ---- */
  function renderAchievements() {
    var mine = S.getPostedSkills();
    var wl = S.getWishlist();
    var badges = [
      { name: 'First Post', icon: '🌟', desc: 'Post your first skill', unlocked: mine.length >= 1 },
      { name: 'Skill Collector', icon: '📚', desc: 'Post 3 or more skills', unlocked: mine.length >= 3 },
      { name: 'Curious Mind', icon: '🔍', desc: 'Add something to your wishlist', unlocked: wl.length >= 1 },
      { name: 'Top Rated', icon: '⭐', desc: 'Keep a 4.8+ rating', unlocked: true },
      { name: 'Super Swapper', icon: '🏆', desc: 'Complete 10 swaps', unlocked: false },
      { name: 'Community Pillar', icon: '🤝', desc: 'Refer 5 friends to SkillSwap', unlocked: false }
    ];
    qs('#achievements-grid').innerHTML = badges.map(function (b) {
      return '<div class="badge-card ' + (b.unlocked ? 'unlocked' : 'locked') + '" data-reveal title="' + S.escapeHTML(b.desc) + '">' +
        '<span class="badge-icon">' + b.icon + '</span>' +
        '<span class="badge-name">' + b.name + '</span>' +
        '<span class="badge-desc">' + b.desc + '</span></div>';
    }).join('');
    S.initReveal();
  }
  renderAchievements();

  activate('skills');
});
