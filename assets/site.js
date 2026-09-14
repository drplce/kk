  (function () {
    // The broadcast player. Waveform peaks were measured from the recording itself.
    var PEAKS = [0.04,0.043,0.042,0.18,0.076,0.077,0.071,0.052,0.045,0.045,0.044,0.047,0.131,0.356,0.347,0.346,0.358,0.366,0.221,0.341,0.383,0.407,0.338,0.413,0.232,0.407,0.324,0.415,0.134,0.047,0.048,0.315,0.52,0.431,0.172,0.465,0.46,0.388,0.094,0.046,0.092,0.335,0.294,0.247,0.396,0.376,0.299,0.216,0.151,0.047,0.049,0.15,0.299,0.281,0.118,0.047,0.045,0.073,0.395,0.42,0.348,0.046,0.047,0.046,0.083,0.207,0.29,0.329,0.419,0.216,0.274,0.267,0.329,0.386,0.318,0.322,0.332,0.458,0.308,0.388,0.383,0.127,0.078,0.059,0.048,0.047,0.045,0.451,0.361,0.395,0.318,0.477,0.32,0.437,0.296,0.045,0.044,0.21,0.422,0.382,0.436,0.195,0.312,0.374,0.346,0.258,0.252,0.233,0.235,0.15,0.184,0.194,0.144,0.14,0.209,0.126,0.123,0.198,0.142,0.352,0.482,0.446,0.333,0.291,0.331,0.294,0.284,0.302,0.358,0.305,0.256,0.249,0.175,0.362,0.409,0.352,0.388,0.267,0.358,0.355,0.264,0.263,0.391,0.274,0.382,0.307,0.324,0.495,0.403,0.385,0.395,0.381,0.36,0.325,0.341,0.361,0.41,0.419,0.421,0.328,0.117,0.045,0.046,0.045,0.046,0.484,0.457,0.317,0.308,0.082,0.045,0.077,0.051,0.247,0.5,0.377,0.385,0.308,0.368,0.399,0.383,0.463,0.312,0.157,0.353,0.312,0.271,0.245,0.365,0.291,0.303,0.405,0.289,0.264,0.454,0.435,0.452,0.332,0.327,0.405,0.404,0.351,0.319,0.322,0.29,0.292,0.393,0.362,0.251,0.345,0.297,0.272,0.374,0.071,0.115,0.54,0.493,0.385,0.407,0.446,0.329,0.38,0.372,0.358,0.269,0.219,0.227,0.449,0.305,0.212,0.349,0.27,0.277,0.335,0.359,0.368,0.52,0.448,0.419,1.0];
    var DUR = 40.6, CLIP = [18.0, 27.4];
    var audio = document.getElementById('audio');
    var player = document.getElementById('player');
    var btn = document.getElementById('play');
    var wave = document.getElementById('wave');
    var canvas = document.getElementById('wavecanvas');
    var tag = document.getElementById('clip-tag');
    var tNow = document.getElementById('t-now');
    var tDur = document.getElementById('t-dur');
    var nowLine = document.getElementById('now-line');
    var cues = Array.prototype.slice.call(document.querySelectorAll('#cues li'));
    if (!audio || !canvas) return;

    function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
    function fmt(s) { s = Math.max(0, s || 0); var m = Math.floor(s / 60), r = Math.floor(s % 60); return m + ':' + (r < 10 ? '0' : '') + r; }

    var ctx = canvas.getContext('2d');
    function draw() {
      var dpr = window.devicePixelRatio || 1;
      var W = wave.clientWidth, H = wave.clientHeight;
      if (!W || !H) return;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var dur = audio.duration && isFinite(audio.duration) ? audio.duration : DUR;
      var pos = (audio.currentTime || 0) / dur;
      var n = PEAKS.length, gap = 1, bw = (W - gap * (n - 1)) / n;
      var ink = css('--ink'), rest = css('--wave'), acc = css('--accent'), soft = css('--accent-soft');
      var cx0 = CLIP[0] / dur * W, cx1 = CLIP[1] / dur * W;
      ctx.fillStyle = soft; ctx.fillRect(cx0, 0, cx1 - cx0, H);
      ctx.fillStyle = acc; ctx.fillRect(cx0, 0, 1, H); ctx.fillRect(cx1 - 1, 0, 1, H);
      tag.style.left = ((cx0 + cx1) / 2) + 'px';
      var mid = H * 0.56, top = 14;
      for (var i = 0; i < n; i++) {
        var x = i * (bw + gap);
        var h = Math.max(2, PEAKS[i] * (H - top - 6));
        var inClip = x >= cx0 && x <= cx1;
        var played = (x + bw / 2) / W <= pos;
        ctx.fillStyle = played ? (inClip ? acc : ink) : (inClip ? acc : rest);
        ctx.globalAlpha = played ? 1 : (inClip ? 0.45 : 1);
        ctx.fillRect(x, mid - h * 0.62, bw, h);
      }
      ctx.globalAlpha = 1;
      if (pos > 0) { ctx.fillStyle = ink; ctx.fillRect(pos * W - 0.5, 0, 1, H); }
    }

    var current = -1;
    function update() {
      var t = audio.currentTime || 0;
      tNow.textContent = fmt(t);
      wave.setAttribute('aria-valuenow', t.toFixed(1));
      var idx = -1;
      for (var i = 0; i < cues.length; i++) {
        var a = parseFloat(cues[i].getAttribute('data-t')), b = parseFloat(cues[i].getAttribute('data-e'));
        if (t >= a && t < b) { idx = i; break; }
      }
      if (idx !== current) {
        cues.forEach(function (li, i) { li.classList.toggle('on', i === idx); });
        current = idx;
        if (idx >= 0) {
          var li = cues[idx];
          nowLine.innerHTML = li.classList.contains('clip')
            ? 'Nine seconds of <b>Pick Up the Pieces</b>, Average White Band, 1974.'
            : li.children[1].innerHTML;
        }
      }
      draw();
    }

    function toggle() { if (audio.paused) { audio.play(); } else { audio.pause(); } }
    btn.addEventListener('click', toggle);
    audio.addEventListener('play', function () { player.classList.add('playing'); btn.setAttribute('aria-pressed', 'true'); btn.setAttribute('aria-label', 'Pause the recording'); });
    audio.addEventListener('pause', function () { player.classList.remove('playing'); btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-label', 'Play the recording'); });
    audio.addEventListener('ended', function () { nowLine.textContent = 'As easy as that.'; draw(); });
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', function () { if (isFinite(audio.duration)) tDur.textContent = fmt(audio.duration); draw(); });

    function seekAt(clientX) {
      var r = wave.getBoundingClientRect();
      var f = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      var dur = audio.duration && isFinite(audio.duration) ? audio.duration : DUR;
      audio.currentTime = f * dur;
      update();
    }
    var dragging = false;
    wave.addEventListener('pointerdown', function (e) { dragging = true; wave.setPointerCapture(e.pointerId); seekAt(e.clientX); });
    wave.addEventListener('pointermove', function (e) { if (dragging) seekAt(e.clientX); });
    wave.addEventListener('pointerup', function () { dragging = false; });
    wave.addEventListener('pointercancel', function () { dragging = false; });
    wave.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 5 : 1;
      if (e.key === 'ArrowRight') { audio.currentTime = Math.min(DUR, audio.currentTime + step); update(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { audio.currentTime = Math.max(0, audio.currentTime - step); update(); e.preventDefault(); }
      else if (e.key === ' ' || e.key === 'Enter') { toggle(); e.preventDefault(); }
    });
    cues.forEach(function (li) {
      li.addEventListener('click', function () {
        audio.currentTime = parseFloat(li.getAttribute('data-t'));
        if (audio.paused) audio.play(); else update();
      });
    });

    var raf;
    function loop() { if (!audio.paused) { update(); raf = requestAnimationFrame(loop); } }
    audio.addEventListener('play', function () { cancelAnimationFrame(raf); loop(); });
    window.addEventListener('resize', draw);
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', draw);
    }
    draw();
  })();

  (function () {
    // Broadcast tabs.
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var j = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i - 1 + tabs.length) % tabs.length : -1;
        if (j >= 0) { select(tabs[j]); tabs[j].focus(); e.preventDefault(); }
      });
    });
  })();

  (function () {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el) { io.observe(el); });
  })();

(function () {
  // Edition IV instrument: the monogram builder on the home page.
  var mono = document.getElementById('bmono');
  if (!mono) return;
  var k1 = document.getElementById('bk1'), k2 = document.getElementById('bk2');
  var w = document.getElementById('c-w'), g = document.getElementById('c-g');
  var it = document.getElementById('c-i'), mi = document.getElementById('c-m'), sw = document.getElementById('c-s');
  var ow = document.getElementById('o-w'), og = document.getElementById('o-g'), recipe = document.getElementById('recipe');
  var reset = document.getElementById('c-reset');
  function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function apply() {
    var weight = parseInt(w.value, 10), gap = parseFloat(g.value);
    mono.style.fontWeight = weight;
    mono.style.letterSpacing = gap + 'em';
    mono.style.fontStyle = it.checked ? 'italic' : 'normal';
    k2.style.transform = mi.checked ? 'scaleX(-1)' : 'none';
    var acc = css('--accent'), ink = css('--ink');
    k1.style.color = sw.checked ? acc : ink;
    k2.style.color = sw.checked ? ink : acc;
    ow.textContent = weight;
    og.textContent = (gap < 0 ? '−' : '') + Math.abs(gap).toFixed(2) + ' em';
    recipe.textContent = 'font-weight: ' + weight + '; letter-spacing: ' + gap.toFixed(2) + 'em;' +
      (it.checked ? ' italic;' : '') +
      (mi.checked ? ' second K mirrored' : ' no mirror') +
      (sw.checked ? ', first K in claret' : ', in claret');
  }
  [w, g, it, mi, sw].forEach(function (el) { el.addEventListener('input', apply); el.addEventListener('change', apply); });
  reset.addEventListener('click', function () {
    w.value = 900; g.value = -0.12; it.checked = false; mi.checked = true; sw.checked = false; apply();
  });
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', apply);
  }
  apply();
})();

(function () {
  // Edition V instrument: the band, 1974. Click a name to open it.
  var cards = Array.prototype.slice.call(document.querySelectorAll('.roster-card'));
  if (!cards.length) return;
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      var open = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });
})();
