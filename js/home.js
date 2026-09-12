/* =========================================================
   SkillSwap — homepage behavior
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  var S = window.SkillSwap;
  var qs = S.qs, qsa = S.qsa;

  /* Featured skills */
  var all = S.getAllSkills();
  var featured = all.filter(function (s) { return s.featured; }).slice(0, 6);
  var list = featured.length ? featured : all.slice(0, 6);
  var featuredGrid = qs('#featured-grid');
  if (featuredGrid) {
    featuredGrid.innerHTML = list.map(function (s) { return S.renderSkillCard(s); }).join('');
    qsa('.skill-card', featuredGrid).forEach(function (card) {
      card.addEventListener('click', function () { location.href = 'browse.html'; });
      card.addEventListener('keydown', function (e) { if (e.key === 'Enter') location.href = 'browse.html'; });
    });
  }

  /* Category chips */
  var catWrap = qs('#home-categories');
  if (catWrap) {
    catWrap.innerHTML = S.CATEGORIES.map(function (c) {
      return '<a class="category-chip" data-reveal href="browse.html?category=' + c.slug + '">' +
        '<span class="cat-icon cat-icon-' + c.color + '">' + c.icon + '</span>' +
        '<span>' + c.name + '</span></a>';
    }).join('');
    S.initReveal();
  }

  /* Stats: mix a couple of illustrative numbers with real dynamic ones */
  var skillsTarget = qs('[data-counter-target="skills"]');
  if (skillsTarget) skillsTarget.setAttribute('data-counter', 480 + all.length);
  var catsTarget = qs('[data-counter-target="categories"]');
  if (catsTarget) catsTarget.setAttribute('data-counter', S.CATEGORIES.length);
  S.initCounters();

  /* Hero search -> browse page */
  var heroForm = qs('#hero-search-form');
  if (heroForm) {
    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = qs('#hero-search-input').value.trim();
      location.href = 'browse.html' + (q ? ('?q=' + encodeURIComponent(q)) : '');
    });
  }

  /* Testimonial carousel */
  var track = qs('#testimonial-track');
  if (track) {
    var cards = qsa('.testimonial-card', track);
    var dotsWrap = qs('#testimonial-dots');
    var idx = 0, auto;

    dotsWrap.innerHTML = cards.map(function (_, i) {
      return '<button type="button" class="dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '" aria-label="Go to testimonial ' + (i + 1) + '"></button>';
    }).join('');

    function go(i) {
      idx = (i + cards.length) % cards.length;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      qsa('.dot', dotsWrap).forEach(function (d, j) { d.classList.toggle('active', j === idx); });
    }
    function startAuto() { auto = setInterval(function () { go(idx + 1); }, 6000); }
    function stopAuto() { clearInterval(auto); }

    qs('#testimonial-prev').addEventListener('click', function () { go(idx - 1); stopAuto(); startAuto(); });
    qs('#testimonial-next').addEventListener('click', function () { go(idx + 1); stopAuto(); startAuto(); });
    dotsWrap.addEventListener('click', function (e) {
      var b = e.target.closest('.dot');
      if (!b) return;
      go(+b.dataset.i); stopAuto(); startAuto();
    });
    var wrap = track.closest('.testimonial-wrap');
    wrap.addEventListener('mouseenter', stopAuto);
    wrap.addEventListener('mouseleave', startAuto);
    startAuto();
  }
});
