/* =========================================================
   SkillSwap — shared core (data, storage, nav, theme, fx)
   Loaded on every page before the page-specific script.
   Exposes everything on window.SkillSwap.
   ========================================================= */
(function () {
  'use strict';

  /* -----------------------------
     Categories
  ------------------------------*/
  var CATEGORIES = [
    { slug: 'design',       name: 'Design',       icon: '🎨', color: 'violet'  },
    { slug: 'programming',  name: 'Programming',  icon: '💻', color: 'blue'    },
    { slug: 'music',        name: 'Music',        icon: '🎵', color: 'pink'    },
    { slug: 'language',     name: 'Language',     icon: '🗣️', color: 'emerald' },
    { slug: 'cooking',      name: 'Cooking',      icon: '🍳', color: 'amber'   },
    { slug: 'photography',  name: 'Photography',  icon: '📷', color: 'cyan'    },
    { slug: 'fitness',      name: 'Fitness',      icon: '🏋️', color: 'red'     },
    { slug: 'business',     name: 'Business',     icon: '📈', color: 'indigo'  }
  ];

  /* -----------------------------
     Sample skills (seed content so the site feels alive
     even before anyone posts something new)
  ------------------------------*/
  var SAMPLE_SKILLS = [
    { id:'s1', title:'Modern Logo & Brand Design', category:'design', icon:'🎨', level:'Expert',
      description:'I’ll help you craft a clean, memorable logo and a mini brand kit: colors, type, and simple guidelines you can actually use.',
      offeredBy:'Priya Nair', wantInExchange:'Guitar lessons or basic video editing help', tags:['branding','illustrator','logo'],
      rating:4.9, swaps:14, createdAt:'2026-09-05T10:00:00Z', featured:true },
    { id:'s2', title:'React & JavaScript Fundamentals', category:'programming', icon:'💻', level:'Intermediate',
      description:'Learn component thinking, hooks, and how to structure a real React app from scratch, no prior framework experience needed.',
      offeredBy:'Marcus Chen', wantInExchange:'Help planning and building a small vegetable garden', tags:['react','javascript','frontend'],
      rating:4.8, swaps:9, createdAt:'2026-08-29T10:00:00Z', featured:true },
    { id:'s3', title:'Acoustic Guitar for Beginners', category:'music', icon:'🎸', level:'Beginner',
      description:'From your very first chord to strumming a full song in about four weeks. No music theory required, just a guitar and patience.',
      offeredBy:'Diego Ramirez', wantInExchange:'Photography basics or honest resume feedback', tags:['guitar','chords','practice'],
      rating:4.7, swaps:21, createdAt:'2026-07-20T10:00:00Z' },
    { id:'s4', title:'Conversational Spanish Practice', category:'language', icon:'🗣️', level:'Intermediate',
      description:'Weekly conversation practice built around your confidence, plus practical travel phrases and everyday slang.',
      offeredBy:'Sofia Torres', wantInExchange:'Help getting comfortable with spreadsheets and Excel', tags:['spanish','conversation','travel'],
      rating:5.0, swaps:17, createdAt:'2026-09-08T10:00:00Z', featured:true },
    { id:'s5', title:'Home Sourdough Bread Baking', category:'cooking', icon:'🍞', level:'Beginner',
      description:'Start and keep a starter alive, then bake your first crusty loaf using a schedule that actually fits a normal week.',
      offeredBy:'Elena Kowalski', wantInExchange:'Basic bike maintenance and repair know-how', tags:['baking','sourdough','bread'],
      rating:4.9, swaps:11, createdAt:'2026-08-15T10:00:00Z' },
    { id:'s6', title:'Portrait Photography & Lighting', category:'photography', icon:'📷', level:'Expert',
      description:'Understand natural and flash lighting so you can get flattering portraits with any camera, even the one in your pocket.',
      offeredBy:'Jamal Whitfield', wantInExchange:'Help building a simple personal budget', tags:['photography','lighting','portraits'],
      rating:4.8, swaps:8, createdAt:'2026-09-01T10:00:00Z', featured:true },
    { id:'s7', title:'Beginner-Friendly Strength Training', category:'fitness', icon:'🏋️', level:'Beginner',
      description:'A simple, safe three-day program to build real strength at home or the gym. Form comes first, always.',
      offeredBy:'Nia Robinson', wantInExchange:'Help building a simple personal website', tags:['strength','form','home workout'],
      rating:4.6, swaps:13, createdAt:'2026-08-10T10:00:00Z' },
    { id:'s8', title:'Small Business Financial Planning', category:'business', icon:'📈', level:'Expert',
      description:'Set up a simple budget, a fair pricing model, and a cash-flow forecast for your side hustle or small shop.',
      offeredBy:'Wei Zhang', wantInExchange:'Logo design or a few social media graphics', tags:['finance','budgeting','startups'],
      rating:4.9, swaps:6, createdAt:'2026-07-05T10:00:00Z' },
    { id:'s9', title:'UI Design in Figma', category:'design', icon:'🖌️', level:'Intermediate',
      description:'Learn auto-layout, components, and prototyping so you can design clean interfaces quickly and confidently.',
      offeredBy:'Priya Nair', wantInExchange:'Copywriting help for a portfolio site', tags:['figma','ui','prototyping'],
      rating:4.8, swaps:10, createdAt:'2026-08-22T10:00:00Z' },
    { id:'s10', title:'Python for Data Analysis', category:'programming', icon:'🐍', level:'Intermediate',
      description:'Pandas, plotting, and cleaning up messy spreadsheets so your data actually tells a story you can act on.',
      offeredBy:'Amara Okafor', wantInExchange:'Cooking lessons, anything vegetarian is welcome', tags:['python','pandas','data'],
      rating:4.7, swaps:12, createdAt:'2026-09-10T10:00:00Z', featured:true },
    { id:'s11', title:'Piano for Absolute Beginners', category:'music', icon:'🎹', level:'Beginner',
      description:'Reading music, hand position, and your first two songs. Patient, no-pressure lessons at your own pace.',
      offeredBy:'Hannah Kim', wantInExchange:'Basic conversational French practice', tags:['piano','sight-reading'],
      rating:5.0, swaps:7, createdAt:'2026-08-18T10:00:00Z' },
    { id:'s12', title:'Freelance Copywriting Basics', category:'business', icon:'✍️', level:'Intermediate',
      description:'Write clearer headlines, emails, and landing page copy that people actually read all the way through.',
      offeredBy:'Oliver Bennett', wantInExchange:'Video editing help for a personal project', tags:['copywriting','marketing'],
      rating:4.6, swaps:5, createdAt:'2026-07-28T10:00:00Z' },
    { id:'s13', title:'Hand-Lettering & Watercolor Basics', category:'design', icon:'✍️', level:'Beginner',
      description:'A relaxed, low-pressure introduction to brush lettering and simple watercolor washes. No art degree needed.',
      offeredBy:'Grace Lindqvist', wantInExchange:'Help meal-prepping for a busy week', tags:['lettering','watercolor','art'],
      rating:4.9, swaps:9, createdAt:'2026-09-03T10:00:00Z', featured:true },
    { id:'s14', title:'Intro to Yoga & Mobility', category:'fitness', icon:'🧘', level:'Beginner',
      description:'Gentle flows to build flexibility and calm a busy mind. Mats optional, patience required, judgment never allowed.',
      offeredBy:'Nia Robinson', wantInExchange:'Help drafting a simple, clean resume', tags:['yoga','mobility','mindfulness'],
      rating:4.8, swaps:15, createdAt:'2026-08-25T10:00:00Z' }
  ];

  /* -----------------------------
     Storage
  ------------------------------*/
  var LS = {
    POSTED: 'skillswap_posted_skills',
    PROFILE: 'skillswap_profile',
    WISHLIST: 'skillswap_wishlist',
    THEME: 'skillswap_theme'
  };

  function readJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (raw == null) return fallback;
      var v = JSON.parse(raw);
      return v == null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable, fail quietly */ }
  }

  function getPostedSkills() { return readJSON(LS.POSTED, []); }
  function savePostedSkills(arr) { writeJSON(LS.POSTED, arr); }
  function addPostedSkill(skill) { var arr = getPostedSkills(); arr.unshift(skill); savePostedSkills(arr); return arr; }
  function deletePostedSkill(id) { var arr = getPostedSkills().filter(function (s) { return s.id !== id; }); savePostedSkills(arr); return arr; }
  function getAllSkills() { return getPostedSkills().concat(SAMPLE_SKILLS); }

  var DEFAULT_PROFILE = {
    name: 'Alex Rivera',
    tagline: 'Full-stack tinkerer & weekend baker',
    location: 'Austin, TX',
    memberSince: '2024-02-11',
    bio: 'I love trading code reviews for sourdough tips. Always down to learn something new and to teach whatever I can.',
    initials: 'AR',
    colorIndex: 2
  };
  function getProfile() { return readJSON(LS.PROFILE, DEFAULT_PROFILE); }
  function saveProfile(p) { writeJSON(LS.PROFILE, p); }

  function getWishlist() { return readJSON(LS.WISHLIST, ['Pottery wheel throwing', 'Spanish conversation practice']); }
  function saveWishlist(list) { writeJSON(LS.WISHLIST, list); }

  /* -----------------------------
     Small helpers
  ------------------------------*/
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function escapeHTML(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function timeAgo(iso) {
    var then = new Date(iso).getTime();
    var now = Date.now();
    var diff = Math.max(0, now - then);
    var day = 86400000;
    var days = Math.floor(diff / day);
    if (days <= 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 7) return days + ' days ago';
    if (days < 30) return Math.floor(days / 7) + (Math.floor(days / 7) === 1 ? ' week ago' : ' weeks ago');
    if (days < 365) return Math.floor(days / 30) + (Math.floor(days / 30) === 1 ? ' month ago' : ' months ago');
    return Math.floor(days / 365) + (Math.floor(days / 365) === 1 ? ' year ago' : ' years ago');
  }

  function initialsOf(name) {
    if (!name) return '??';
    var parts = name.trim().split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join('') || '??';
  }

  function colorIndexOf(str) {
    str = String(str || 'x');
    var h = 0;
    for (var i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) >>> 0; }
    return h % 8;
  }

  function categoryMeta(slug) {
    for (var i = 0; i < CATEGORIES.length; i++) { if (CATEGORIES[i].slug === slug) return CATEGORIES[i]; }
    return { slug: slug, name: slug || 'General', icon: '⭐', color: 'violet' };
  }

  function levelClass(level) {
    if (level === 'Intermediate') return 'lvl-intermediate';
    if (level === 'Expert') return 'lvl-expert';
    return 'lvl-beginner';
  }

  /* -----------------------------
     Render a skill card (used on home, browse, profile, and
     the live preview on the post-a-skill page)
  ------------------------------*/
  function renderSkillCard(skill, opts) {
    opts = opts || {};
    var cat = categoryMeta(skill.category);
    var owner = skill.offeredBy || 'Someone';
    var initials = initialsOf(owner);
    var avColor = colorIndexOf(owner);
    var rating = Number(skill.rating || 4.8).toFixed(1);
    var deleteBtn = opts.deletable
      ? '<button type="button" class="card-delete" data-delete-id="' + escapeHTML(skill.id) + '" aria-label="Delete ' + escapeHTML(skill.title) + '">✕</button>'
      : '';
    var youTag = skill.isUserPosted ? '<span class="you-tag">You</span>' : '';
    var interactive = opts.preview ? '' : ' tabindex="0" role="button" aria-haspopup="dialog"';

    return (
      '<article class="skill-card" data-reveal data-id="' + escapeHTML(skill.id) + '"' + interactive + '>' +
        deleteBtn +
        '<div class="skill-card-top">' +
          '<span class="skill-icon cat-icon-' + cat.color + '">' + (skill.icon || cat.icon) + '</span>' +
          '<span class="chip chip-' + cat.color + '">' + cat.icon + ' ' + escapeHTML(cat.name) + '</span>' +
        '</div>' +
        '<h3 class="skill-title">' + escapeHTML(skill.title || 'Untitled skill') + '</h3>' +
        '<p class="skill-desc">' + escapeHTML(skill.description || '') + '</p>' +
        '<div class="skill-meta">' +
          '<span class="badge ' + levelClass(skill.level) + '">' + escapeHTML(skill.level || 'Beginner') + '</span>' +
          '<span class="skill-rating">★ ' + rating + '</span>' +
        '</div>' +
        '<div class="skill-exchange"><strong>Wants:</strong> ' + escapeHTML(skill.wantInExchange || 'Open to offers') + '</div>' +
        '<div class="skill-footer">' +
          '<span class="avatar avatar-sm avatar-c' + avColor + '">' + escapeHTML(initials) + '</span>' +
          '<span class="skill-owner">' + escapeHTML(owner) + '</span>' +
          youTag +
        '</div>' +
      '</article>'
    );
  }

  /* -----------------------------
     Toasts
  ------------------------------*/
  function toast(message, type) {
    type = type || 'success';
    var container = qs('#toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    var icon = type === 'success' ? '✓' : (type === 'error' ? '!' : 'i');
    var el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML =
      '<span class="toast-icon">' + icon + '</span>' +
      '<span class="toast-msg"></span>' +
      '<button type="button" class="toast-close" aria-label="Dismiss">✕</button>';
    el.querySelector('.toast-msg').textContent = message;
    container.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    var timer = setTimeout(remove, 4200);
    function remove() { el.classList.remove('show'); setTimeout(function () { el.remove(); }, 350); }
    el.querySelector('.toast-close').addEventListener('click', function () { clearTimeout(timer); remove(); });
  }

  /* -----------------------------
     Reveal on scroll
  ------------------------------*/
  var revealObserver;
  function initReveal() {
    var els = qsa('[data-reveal]').filter(function (e) { return !e.classList.contains('is-visible'); });
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-visible'); }); return; }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    }
    els.forEach(function (e) { revealObserver.observe(e); });
  }

  /* -----------------------------
     Animated counters
  ------------------------------*/
  function initCounters() {
    var els = qsa('[data-counter]').filter(function (e) { return !e.dataset.counted; });
    if (!els.length) return;
    function animate(el) {
      el.dataset.counted = '1';
      var raw = el.getAttribute('data-counter');
      var target = parseFloat(raw);
      if (isNaN(target)) return;
      var decimals = (raw.split('.')[1] || '').length;
      var dur = 1300;
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        el.textContent = formatNumber(val, decimals);
        if (p < 1) requestAnimationFrame(step); else el.textContent = formatNumber(target, decimals);
      }
      requestAnimationFrame(step);
    }
    function formatNumber(n, decimals) {
      var fixed = n.toFixed(decimals);
      var parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
    if (!('IntersectionObserver' in window)) { els.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); } });
    }, { threshold: 0.5 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* -----------------------------
     Nav (active link, mobile panel, scroll shadow)
  ------------------------------*/
  function initNav() {
    var header = qs('.site-header');
    var toggle = qs('.nav-toggle');
    var panel = qs('#mobile-panel');
    var backdrop = qs('.panel-backdrop');
    var path = (location.pathname.split('/').pop() || 'index.html');

    qsa('.nav-link, .mobile-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path || (href === 'index.html' && path === '')) link.classList.add('active');
    });

    function closePanel() {
      panel.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('is-active');
      document.body.classList.remove('no-scroll');
    }
    function openPanel() {
      panel.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.classList.add('is-active');
      document.body.classList.add('no-scroll');
    }
    if (toggle && panel) {
      toggle.addEventListener('click', function () {
        var isOpen = panel.classList.contains('open');
        isOpen ? closePanel() : openPanel();
      });
      qsa('a', panel).forEach(function (a) { a.addEventListener('click', closePanel); });
      if (backdrop) backdrop.addEventListener('click', closePanel);
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });
    }
    if (header) {
      var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  /* -----------------------------
     Theme toggle
  ------------------------------*/
  function initTheme() {
    var btn = qs('.theme-toggle');
    var stored = null;
    try { stored = localStorage.getItem(LS.THEME); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    if (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      btn.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme');
        var next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem(LS.THEME, next); } catch (e) {}
        btn.setAttribute('aria-pressed', String(next === 'dark'));
      });
    }
  }

  /* -----------------------------
     Accordion (how-it-works FAQ)
  ------------------------------*/
  function initAccordions() {
    qsa('.accordion-header').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.accordion-item');
        var panel = item.querySelector('.accordion-panel');
        var group = btn.closest('.accordion');
        var wasOpen = item.classList.contains('open');
        if (group) {
          qsa('.accordion-item.open', group).forEach(function (other) {
            if (other !== item) {
              other.classList.remove('open');
              other.querySelector('.accordion-panel').style.maxHeight = null;
              other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            }
          });
        }
        item.classList.toggle('open', !wasOpen);
        btn.setAttribute('aria-expanded', String(!wasOpen));
        panel.style.maxHeight = !wasOpen ? panel.scrollHeight + 'px' : null;
      });
    });
  }

  /* -----------------------------
     Modals
  ------------------------------*/
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    var focusable = modalEl.querySelector('[data-autofocus]') || modalEl.querySelector('input, button, a, textarea, select');
    if (focusable) focusable.focus();
  }
  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
  function initModals() {
    qsa('.modal').forEach(function (m) {
      m.addEventListener('click', function (e) {
        if (e.target === m || e.target.hasAttribute('data-modal-close')) closeModal(m);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') qsa('.modal.open').forEach(closeModal);
    });
  }

  /* -----------------------------
     Subtle hero parallax (mouse-driven, desktop only)
  ------------------------------*/
  function initParallax() {
    var hero = qs('[data-parallax]');
    if (!hero) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    var layers = qsa('[data-depth]', hero);
    if (!layers.length) return;
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach(function (l) {
        var depth = parseFloat(l.getAttribute('data-depth')) || 10;
        l.style.transform = 'translate(' + (x * depth).toFixed(1) + 'px,' + (y * depth).toFixed(1) + 'px)';
      });
    });
  }

  /* -----------------------------
     Button ripple
  ------------------------------*/
  function initRipple() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.btn') : null;
      if (!btn) return;
      var rect = btn.getBoundingClientRect();
      var span = document.createElement('span');
      span.className = 'ripple';
      var size = Math.max(rect.width, rect.height);
      span.style.width = span.style.height = size + 'px';
      span.style.left = (e.clientX - rect.left - size / 2) + 'px';
      span.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(span);
      span.addEventListener('animationend', function () { span.remove(); });
    });
  }

  function initFooterYear() { qsa('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); }); }

  function initNewsletter() {
    qsa('.footer-newsletter').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        toast('Thanks for subscribing! 🎉');
        form.reset();
      });
    });
  }

  /* -----------------------------
     Sync the little header avatar with the saved profile
  ------------------------------*/
  function initHeaderProfile() {
    var els = qsa('.profile-link .avatar');
    if (!els.length) return;
    var p = getProfile();
    els.forEach(function (el) {
      el.textContent = p.initials;
      el.className = 'avatar avatar-c' + p.colorIndex;
    });
  }

  /* -----------------------------
     Public API
  ------------------------------*/
  window.SkillSwap = {
    CATEGORIES: CATEGORIES,
    SAMPLE_SKILLS: SAMPLE_SKILLS,
    getPostedSkills: getPostedSkills,
    savePostedSkills: savePostedSkills,
    addPostedSkill: addPostedSkill,
    deletePostedSkill: deletePostedSkill,
    getAllSkills: getAllSkills,
    getProfile: getProfile,
    saveProfile: saveProfile,
    getWishlist: getWishlist,
    saveWishlist: saveWishlist,
    qs: qs,
    qsa: qsa,
    escapeHTML: escapeHTML,
    debounce: debounce,
    timeAgo: timeAgo,
    initialsOf: initialsOf,
    colorIndexOf: colorIndexOf,
    categoryMeta: categoryMeta,
    renderSkillCard: renderSkillCard,
    toast: toast,
    initReveal: initReveal,
    initCounters: initCounters,
    openModal: openModal,
    closeModal: closeModal
  };

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initTheme();
    initReveal();
    initAccordions();
    initModals();
    initParallax();
    initRipple();
    initFooterYear();
    initHeaderProfile();
    initNewsletter();
  });
})();
