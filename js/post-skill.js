/* =========================================================
   SkillSwap — post-a-skill form behavior
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  var S = window.SkillSwap;
  var qs = S.qs, qsa = S.qsa;

  var form = qs('#post-form');
  var preview = qs('#live-preview');
  var iconPicker = qs('#icon-picker');
  var tagInput = qs('#tag-input');
  var tagsContainer = qs('#tags-container');
  var descInput = qs('#description');
  var descCount = qs('#desc-count');
  if (!form) return;

  var ICONS = ['⭐', '🎨', '💻', '🎵', '🗣️', '🍳', '📷', '🏋️', '📈', '✍️', '🧶', '📐', '🎬', '🌱'];
  var tags = [];
  var selectedIcon = ICONS[0];

  iconPicker.innerHTML = ICONS.map(function (ic, i) {
    return '<button type="button" class="icon-opt' + (i === 0 ? ' selected' : '') + '" data-icon="' + ic + '" aria-label="Use icon ' + ic + '">' + ic + '</button>';
  }).join('');

  iconPicker.addEventListener('click', function (e) {
    var b = e.target.closest('.icon-opt');
    if (!b) return;
    qsa('.icon-opt', iconPicker).forEach(function (x) { x.classList.remove('selected'); });
    b.classList.add('selected');
    selectedIcon = b.dataset.icon;
    updatePreview();
  });

  function renderTags() {
    tagsContainer.innerHTML = tags.map(function (t, i) {
      return '<span class="tag-chip">' + S.escapeHTML(t) + '<button type="button" data-i="' + i + '" aria-label="Remove ' + S.escapeHTML(t) + '">✕</button></span>';
    }).join('');
  }
  function addTag(val) {
    val = (val || '').trim().replace(/,$/, '');
    if (!val || tags.length >= 5 || tags.indexOf(val) > -1) return;
    tags.push(val);
    renderTags();
    updatePreview();
  }
  tagsContainer.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    tags.splice(+b.dataset.i, 1);
    renderTags();
    updatePreview();
  });
  tagInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput.value);
      tagInput.value = '';
    } else if (e.key === 'Backspace' && !tagInput.value && tags.length) {
      tags.pop();
      renderTags();
      updatePreview();
    }
  });
  tagInput.addEventListener('blur', function () { if (tagInput.value.trim()) { addTag(tagInput.value); tagInput.value = ''; } });

  if (descInput) {
    descInput.addEventListener('input', function () {
      descCount.textContent = descInput.value.length + '/300';
      updatePreview();
    });
  }

  qsa('#post-form input, #post-form select, #post-form textarea').forEach(function (el) {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });

  function currentDraftSkill() {
    var fd = new FormData(form);
    return {
      id: 'draft',
      title: fd.get('title') || 'Your skill title goes here',
      category: fd.get('category') || 'design',
      level: fd.get('level') || 'Beginner',
      description: fd.get('description') || 'A short, friendly description of what you can teach will appear here as you type.',
      wantInExchange: fd.get('wantInExchange') || 'Whatever you can offer in return',
      offeredBy: fd.get('name') || 'You',
      tags: tags.slice(),
      icon: selectedIcon,
      rating: 5.0,
      isUserPosted: true,
      createdAt: new Date().toISOString()
    };
  }
  function updatePreview() { preview.innerHTML = S.renderSkillCard(currentDraftSkill(), { preview: true }); }
  updatePreview();

  function setFieldError(field, msg) {
    var err = qs('[data-error-for="' + field + '"]');
    if (err) err.textContent = msg || '';
    var input = form.elements[field];
    var group = input && input.closest ? input.closest('.form-group') : null;
    if (group) group.classList.toggle('has-error', !!msg);
  }

  function validate() {
    var ok = true;
    var fd = new FormData(form);
    var required = {
      title: 'Please enter a skill title.',
      category: 'Please choose a category.',
      level: 'Please select your skill level.',
      description: 'Tell people a bit more (at least 20 characters).',
      wantInExchange: 'Let people know what you would like in return.',
      name: 'We need your name so people know who is offering this.'
    };
    Object.keys(required).forEach(function (field) {
      var val = (fd.get(field) || '').toString().trim();
      var bad = !val;
      if (field === 'description' && val.length > 0 && val.length < 20) bad = true;
      setFieldError(field, bad ? required[field] : '');
      if (bad) ok = false;
    });
    var email = (fd.get('email') || '').toString().trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError('email', 'Please enter a valid email address.'); ok = false; }
    else setFieldError('email', '');
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var card = qs('.form-card');
      card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
      S.toast('Please fix the highlighted fields.', 'error');
      var firstError = qs('.has-error input, .has-error select, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }
    var fd = new FormData(form);
    var skill = {
      id: 'u' + Date.now(),
      title: fd.get('title').toString().trim(),
      category: fd.get('category'),
      level: fd.get('level'),
      description: fd.get('description').toString().trim(),
      wantInExchange: fd.get('wantInExchange').toString().trim(),
      offeredBy: fd.get('name').toString().trim(),
      email: (fd.get('email') || '').toString().trim(),
      tags: tags.slice(),
      icon: selectedIcon,
      rating: 5.0,
      swaps: 0,
      isUserPosted: true,
      featured: false,
      createdAt: new Date().toISOString()
    };
    S.addPostedSkill(skill);
    qs('#post-form-wrap').hidden = true;
    qs('#success-panel').hidden = false;
    S.initReveal();
    S.toast('Your skill is live! 🎉');
    window.scrollTo({ top: qs('#success-panel').offsetTop - 100, behavior: 'smooth' });
  });

  var postAnotherBtn = qs('#post-another');
  if (postAnotherBtn) {
    postAnotherBtn.addEventListener('click', function () {
      form.reset();
      tags = [];
      renderTags();
      selectedIcon = ICONS[0];
      qsa('.icon-opt', iconPicker).forEach(function (x, i) { x.classList.toggle('selected', i === 0); });
      if (descCount) descCount.textContent = '0/300';
      qsa('.form-group').forEach(function (g) { g.classList.remove('has-error'); });
      qsa('.form-error').forEach(function (e) { e.textContent = ''; });
      updatePreview();
      qs('#success-panel').hidden = true;
      qs('#post-form-wrap').hidden = false;
      window.scrollTo({ top: qs('#post-form-wrap').offsetTop - 100, behavior: 'smooth' });
    });
  }
});
