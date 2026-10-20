/* Edition XI, Airwaves: the radio instruments.
 * Everything here is guarded, so each block does nothing on pages without its markup.
 * Contents: the scroll dial, the warm-up static, the tuner (a dial through time), and three games from the
 * essay in chapter XVIII (Skip show 22, Find the Job, Venture). All game content is
 * the site's own invention, written to fit the essay's descriptions.
 */
(function () {
  'use strict';
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function $(id) { return document.getElementById(id); }
  function rand(n) { return Math.floor(Math.random() * n); }
  function shuffle(a) { var b = a.slice(), i, j, t; for (i = b.length - 1; i > 0; i--) { j = rand(i + 1); t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
  function noise(ctx, w, h, alpha) {
    var img = ctx.createImageData(w, h), d = img.data, i, v;
    for (i = 0; i < d.length; i += 4) { v = 40 + rand(200); d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = alpha; }
    ctx.putImageData(img, 0, 0);
  }

  // ---- the scroll dial: a needle under the nav that tracks how far down the page you are
  (function () {
    var bar = document.querySelector('.dialbar i');
    if (!bar) return;
    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.left = (p * 100).toFixed(2) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  // ---- the warm-up: static that resolves into the hero
  (function () {
    var c = $('hero-static');
    if (!c || reduce || !c.getContext) return;
    var ctx = c.getContext('2d'), start = Date.now(), timer;
    function frame() {
      var t = Date.now() - start;
      if (t > 2400) { clearInterval(timer); ctx.clearRect(0, 0, c.width, c.height); c.style.display = 'none'; return; }
      noise(ctx, c.width, c.height, Math.round(255 * Math.max(0, 1 - t / 2400)));
    }
    timer = setInterval(frame, 70);
    frame();
  })();

  // ---- the tuner: a dial through time (data in assets/dial-data.js; the essay's six stops sit on a third band)
  (function () {
    var root = $('tuner-set');
    if (!root) return;
    var D = window.DIAL || null;
    var range = $('tuner-range'), needle = $('tuner-needle'), scale = $('tuner-scale'), out = $('tuner-freq');
    var power = $('tuner-power'), mute = $('tuner-mute'), prev = $('tuner-prev'), next = $('tuner-next');
    var eye = $('tuner-eye'), cv = $('tuner-static');
    var st = $('tuner-station'), ti = $('tuner-title'), tx = $('tuner-text'), hist = $('tuner-hist');
    var yr = $('dial-year'), yrange = $('dial-year-range'), marks = $('time-marks'), ticks = $('time-ticks'), tev = $('time-event');
    var tprev = $('time-prev'), tnext = $('time-next'), tplay = $('time-play'), list = $('dial-list'), bandLabel = $('dial-band-label');
    if (!range || !needle || !scale || !st || !ti || !tx) return;

    var ESSAY = [
      { v: 600, tone: 262, name: 'Skip show 22', text: 'A copy of 21, the essay says, with the same rules and a quizmaster who read them his own way. The quick route to 22 was to get two 11s, and a very approximate answer could earn 11 points.' },
      { v: 760, tone: 294, name: 'Find the Job', text: 'A clone of Just the Job, where a contestant has 20 questions to name someone’s occupation. Like 22, the essay says, it was riddled with inconsistency, and jobs were changed at will. It became a minor hit.' },
      { v: 910, tone: 330, name: 'Venture, Boaty’s version', text: 'Mik Boaty, seeing how popular the original was, started his own. It was cash-strapped from the start. Contestants who finished with a negative score paid the debt on leaving, and an Unlucky Dip category cost a contestant the amount nominated.' },
      { v: 1060, tone: 349, name: 'Venture, Fat’s version', text: 'Fat launched a take-over bid and found sponsorship from a huge, popular soft drink maker. Boaty sent his scorer round the audience with a hat at half time. Boaty’s version, the essay says, collapsed.' },
      { v: 1250, tone: 392, name: 'Letters to the press', text: 'Listeners wrote in with mixed views. Few backed his methods. The complaints were favouritism, sponsors first, a sinister style, and competitions never to be won. The essay’s defence: a one-man show, with no producer or auditor to check the answers.' },
      { v: 1450, tone: 440, name: 'Closing down', text: 'As television soaked up the sponsors’ time, Fat made a defiant attempt to keep the radio quizzes going, until the sponsorship ran out. The essay’s verdict: “Now there is nothing left except memories.”' }
    ];
    var B = {
      AM: { min: 520, max: 1620, label: 'AM · kHz', fmt: function (v) { return v + ' kHz'; }, tol: 12, rng: 34, minor: 20, major: 100, lab: function (v) { return v; } },
      FM: { min: 870, max: 1090, label: 'FM · MHz', fmt: function (v) { return (v / 10).toFixed(1) + ' MHz'; }, tol: 3, rng: 9, minor: 5, major: 20, lab: function (v) { return (v / 10).toFixed(0); } },
      FAT: { min: 520, max: 1620, label: 'Pigman’s dial · decoration only', fmt: function (v) { return String(v); }, tol: 12, rng: 34, minor: 20, major: 100, lab: function (v) { return v; } }
    };
    var CITY = { jhb: 'Johannesburg', cpt: 'Cape Town', dbn: 'Durban' };
    var yMin = D && D.meta ? D.meta.yearMin : 1950, yMax = D && D.meta ? D.meta.yearMax : 2026;
    var year = D && D.meta && D.meta.defaultYear ? D.meta.defaultYear : 1995, band = 'AM', city = 'jhb';
    var items = [], tunedItem = null, tunedKey = '';
    var on = false, muted = false, ac = null, nGain, tGain, osc, master, playTimer = null;

    function radioVal(name) { var r = root.querySelectorAll('input[name="' + name + '"]'), i; for (i = 0; i < r.length; i++) if (r[i].checked) return r[i].value; return ''; }
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function srcLinks(ids) {
      if (!ids || !ids.length || !D || !D.sources) return '';
      return ' ' + ids.map(function (id) {
        var i; for (i = 0; i < D.sources.length; i++) if (D.sources[i].id === id) return '<a class="sref" href="#dial-src-' + esc(id) + '">[' + (i + 1) + ']</a>';
        return '';
      }).join('');
    }
    function nameAt(s, y) {
      var i, n = s.names || [];
      for (i = 0; i < n.length; i++) if (n[i].from <= y && (n[i].to == null || n[i].to >= y)) return n[i].name;
      return s.name;
    }
    function itemsNow() {
      var res = [];
      if (band === 'FAT') { ESSAY.forEach(function (e) { res.push({ v: e.v, name: e.name, tone: e.tone, essay: e }); }); return res; }
      if (!D || !D.stations) return res;
      D.stations.forEach(function (s) {
        (s.runs || []).forEach(function (r) {
          if (r.band !== band) return;
          if (r.city !== 'all' && r.city !== city) return;
          if (r.from > year || (r.to != null && r.to < year)) return;
          res.push({ v: band === 'FM' ? Math.round(r.f * 10) : Math.round(r.f), name: nameAt(s, year), st: s, run: r });
        });
      });
      res.sort(function (a, b) { return a.v - b.v; });
      res.forEach(function (o, i) { o.tone = 196 + 22 * i; });
      return res;
    }
    function eventsFor() {
      if (!D || !D.events) return [];
      return D.events.filter(function (e) { return e.city === 'all' || e.city === city; });
    }
    function pctYear(y) { return (y - yMin) / (yMax - yMin); }

    // ---- the year bar
    function buildYearBar() {
      if (!marks || !yrange) return;
      yrange.min = yMin; yrange.max = yMax; yrange.value = year;
      var h = '', ev = eventsFor(), byYear = {};
      ev.forEach(function (e) { (byYear[e.y] = byYear[e.y] || []).push(e); });
      Object.keys(byYear).forEach(function (k) {
        var y = parseInt(k, 10), t = byYear[k].map(function (e) { return e.text; }).join(' / ');
        h += '<button type="button" class="tmark" data-y="' + y + '" style="left:calc(9px + (100% - 18px) * ' + pctYear(y).toFixed(4) + ')" aria-label="' + y + ': ' + esc(t) + '" title="' + y + ': ' + esc(t) + '"></button>';
      });
      marks.innerHTML = h;
      if (ticks && !ticks.firstChild) {
        var t = '', d;
        for (d = Math.ceil(yMin / 10) * 10; d <= yMax; d += 10) t += '<span style="left:calc(9px + (100% - 18px) * ' + pctYear(d).toFixed(4) + ')">' + d + '</span>';
        ticks.innerHTML = t;
      }
    }
    function yearEvents() {
      if (!tev) return;
      var ev = eventsFor().filter(function (e) { return e.y === year; });
      if (ev.length) { tev.innerHTML = ev.map(function (e) { return '<b>' + e.y + '</b> ' + esc(e.text) + srcLinks(e.src); }).join('<br>'); return; }
      var later = eventsFor().filter(function (e) { return e.y > year; }).map(function (e) { return e.y; }).sort(function (a, b) { return a - b; })[0];
      tev.textContent = 'No change recorded for ' + CITY[city] + ' in ' + year + '.' + (later ? ' The next mark is ' + later + '.' : '');
    }
    function stepChange(dir) {
      var ys = eventsFor().map(function (e) { return e.y; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return a - b; }), i, t = null;
      if (dir > 0) { for (i = 0; i < ys.length; i++) if (ys[i] > year) { t = ys[i]; break; } }
      else { for (i = ys.length - 1; i >= 0; i--) if (ys[i] < year) { t = ys[i]; break; } }
      if (t !== null) setYear(t);
    }
    function stopPlay() { if (playTimer) { clearInterval(playTimer); playTimer = null; } if (tplay) { tplay.setAttribute('aria-pressed', 'false'); tplay.textContent = 'Play through time'; } }
    function setYear(y) { year = Math.max(yMin, Math.min(yMax, y)); if (yrange) yrange.value = year; refresh(); }

    // ---- the dial
    function buildScale() {
      var b = B[band], h = '', v, p, i;
      for (v = b.min; v <= b.max; v += b.minor) {
        p = ((v - b.min) / (b.max - b.min)) * 100;
        var isMajor = (v - b.min) % b.major === 0 || v % b.major === 0;
        h += '<span class="tick' + (isMajor ? ' big' : '') + '" style="left:' + p.toFixed(2) + '%">' + (isMajor && (band === 'FM' ? true : v % 100 === 0) ? '<em>' + b.lab(v) + '</em>' : '') + '</span>';
      }
      items.forEach(function (it) { p = ((it.v - b.min) / (b.max - b.min)) * 100; h += '<span class="mark-st" style="left:' + p.toFixed(2) + '%" title="' + esc(it.name) + '"></span>'; });
      scale.innerHTML = h;
      if (bandLabel) bandLabel.textContent = b.label;
      range.min = b.min; range.max = b.max; range.step = 1;
    }
    function buildList() {
      if (!list) return;
      if (!items.length) {
        var msg = band === 'FAT' ? '' : (band === 'FM' && D && D.meta && D.meta.fmStart && year < D.meta.fmStart) ? 'No FM stations recorded in ' + year + '. ' + (D.meta.fmNote || '') : 'No ' + band + ' stations recorded for ' + CITY[city] + ' in ' + year + '. The research could not fill this gap.';
        list.innerHTML = msg ? '<p class="dial-empty">' + esc(msg) + '</p>' : '';
        return;
      }
      list.innerHTML = '<span class="label">On the dial' + (band === 'FAT' ? '' : ' in ' + year) + '</span>' + items.map(function (it, i) { return '<button type="button" class="chip" data-i="' + i + '">' + esc(it.name) + ' · ' + B[band].fmt(it.v) + '</button>'; }).join('');
    }
    function nearest(v) { var bi = -1, bd = 1e9, i, d; for (i = 0; i < items.length; i++) { d = Math.abs(v - items[i].v); if (d < bd) { bd = d; bi = i; } } return { i: bi, d: bd }; }
    function prox(v) { var n = nearest(v), b = B[band]; return n.i < 0 ? 0 : Math.max(0, 1 - n.d / b.rng); }
    function startAudio() {
      if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ac = new AC();
      var len = ac.sampleRate * 2, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0), i, last = 0, w;
      for (i = 0; i < len; i++) { w = Math.random() * 2 - 1; last = (last + 0.1 * w) / 1.1; d[i] = w * 0.45 + last * 2.2; }
      var src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
      var bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = 0.4;
      nGain = ac.createGain(); nGain.gain.value = 0;
      osc = ac.createOscillator(); osc.type = 'triangle'; osc.frequency.value = 262;
      tGain = ac.createGain(); tGain.gain.value = 0;
      master = ac.createGain(); master.gain.value = muted ? 0 : 1;
      src.connect(bp); bp.connect(nGain); nGain.connect(master);
      osc.connect(tGain); tGain.connect(master); master.connect(ac.destination);
      src.start(); osc.start();
    }
    function audioLevels(v) {
      if (!ac || !nGain) return;
      var p = on ? prox(v) : 0, n = nearest(v), t = ac.currentTime;
      nGain.gain.setTargetAtTime(on ? 0.11 * (1 - p * 0.92) : 0, t, 0.06);
      tGain.gain.setTargetAtTime(on ? 0.05 * p * p : 0, t, 0.08);
      if (n.i >= 0) osc.frequency.setTargetAtTime(items[n.i].tone, t, 0.05);
    }
    function card(it) {
      var b = B[band], h = '';
      if (it.essay) { st.textContent = 'Pigman’s dial · stop ' + (items.indexOf(it) + 1) + ' of ' + items.length; ti.textContent = it.name; tx.textContent = it.essay.text; if (hist) hist.innerHTML = ''; return; }
      st.textContent = b.fmt(it.v) + ' · ' + CITY[city] + ' · ' + year;
      ti.textContent = it.name;
      tx.innerHTML = esc((it.st.blurb || '') + (it.run.note ? ' ' + it.run.note : '')) + srcLinks((it.run.src || []).concat(it.st.src || []));
      if (hist) {
        var evs = (D.events || []).filter(function (e) { return e.station === it.st.id; }).sort(function (a, c) { return a.y - c.y; });
        h = evs.map(function (e) { return '<li class="' + (e.y <= year ? 'past' : 'future') + '"><b>' + e.y + '</b> ' + esc(e.text) + srcLinks(e.src) + '</li>'; }).join('');
        (it.st.lavine || []).forEach(function (l) { if (l.from <= year && l.to >= year) h += '<li class="lavine"><b>' + year + '</b> Rafe Lavine on air here (' + esc(l.text) + ').</li>'; });
        hist.innerHTML = h;
      }
    }
    function render() {
      var b = B[band], v = parseInt(range.value, 10);
      needle.style.left = 'calc(18px + (100% - 36px) * ' + ((v - b.min) / (b.max - b.min)).toFixed(4) + ')';
      out.textContent = b.fmt(v);
      var n = nearest(v), pr = on ? prox(v) : 0;
      if (eye) eye.style.transform = 'scaleX(' + (1 - pr * 0.82).toFixed(3) + ')';
      root.style.setProperty('--tuned', pr.toFixed(3));
      var which = (on && n.i >= 0 && n.d <= b.tol) ? n.i : -1;
      var key = band + city + year + ':' + which + ':' + on;
      if (key !== tunedKey) {
        tunedKey = key; tunedItem = which >= 0 ? items[which] : null;
        if (hist) hist.innerHTML = '';
        if (!on) { st.textContent = 'Off'; ti.textContent = 'The set is off'; tx.textContent = 'Switch it on to warm the valves, then turn the knob or use the stop buttons.'; }
        else if (which < 0) { st.textContent = 'Static'; ti.textContent = 'Between stations'; tx.textContent = items.length ? 'Turn the knob, or press Next stop.' : 'Nothing recorded on this band for this city and year.'; }
        else card(items[which]);
      }
      audioLevels(v);
    }
    function refresh() {
      items = itemsNow();
      buildScale(); buildList(); yearEvents();
      if (yr) yr.textContent = band === 'FAT' ? '—' : year;
      tunedKey = '';
      var b = B[band], v = parseInt(range.value, 10);
      if (v < b.min || v > b.max) range.value = items.length ? items[0].v : b.min + 20;
      render();
    }
    function setBand(nb) {
      band = nb;
      var dated = band !== 'FAT';
      [yrange, tprev, tnext, tplay].forEach(function (e) { if (e) e.disabled = !dated || !D; });
      if (!dated) stopPlay();
      items = itemsNow(); buildScale();
      range.value = items.length ? items[0].v : B[band].min + 20;
      refresh();
    }
    function jump(dir) {
      if (!items.length) return;
      var v = parseInt(range.value, 10), i, tgt = null;
      if (dir > 0) { for (i = 0; i < items.length; i++) if (items[i].v > v + 1) { tgt = items[i].v; break; } if (tgt === null) tgt = items[0].v; }
      else { for (i = items.length - 1; i >= 0; i--) if (items[i].v < v - 1) { tgt = items[i].v; break; } if (tgt === null) tgt = items[items.length - 1].v; }
      range.value = tgt; render();
    }

    power.addEventListener('click', function () {
      on = !on;
      power.setAttribute('aria-pressed', on ? 'true' : 'false');
      power.textContent = on ? 'Switch off' : 'Switch on';
      root.classList.toggle('is-on', on);
      mute.disabled = !on; range.disabled = !on; prev.disabled = !on; next.disabled = !on;
      if (on) startAudio();
      if (ac && master) master.gain.setTargetAtTime(muted ? 0 : 1, ac.currentTime, 0.03);
      tunedKey = ''; render();
    });
    mute.addEventListener('click', function () {
      muted = !muted;
      mute.setAttribute('aria-pressed', muted ? 'true' : 'false');
      mute.textContent = muted ? 'Sound off' : 'Sound on';
      if (ac && master) master.gain.setTargetAtTime(muted ? 0 : 1, ac.currentTime, 0.03);
    });
    prev.addEventListener('click', function () { jump(-1); });
    next.addEventListener('click', function () { jump(1); });
    range.addEventListener('input', render);
    if (list) list.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.chip') : null;
      if (!b || !items[+b.getAttribute('data-i')]) return;
      range.value = items[+b.getAttribute('data-i')].v; if (!on) { power.click(); } else { render(); }
    });
    if (yrange) yrange.addEventListener('input', function () { stopPlay(); setYear(parseInt(yrange.value, 10)); });
    if (marks) marks.addEventListener('click', function (e) { var t = e.target; if (t && t.getAttribute && t.getAttribute('data-y')) { stopPlay(); setYear(parseInt(t.getAttribute('data-y'), 10)); } });
    if (tprev) tprev.addEventListener('click', function () { stopPlay(); stepChange(-1); });
    if (tnext) tnext.addEventListener('click', function () { stopPlay(); stepChange(1); });
    if (tplay) tplay.addEventListener('click', function () {
      if (playTimer) { stopPlay(); return; }
      if (year >= yMax) setYear(yMin);
      tplay.setAttribute('aria-pressed', 'true'); tplay.textContent = 'Pause';
      playTimer = setInterval(function () { if (year >= yMax) { stopPlay(); return; } setYear(year + 1); }, 420);
    });
    root.querySelectorAll('input[name="dial-band"]').forEach(function (r) { r.addEventListener('change', function () { setBand(radioVal('dial-band')); }); });
    root.querySelectorAll('input[name="dial-city"]').forEach(function (r) { r.addEventListener('change', function () { city = radioVal('dial-city'); buildYearBar(); refresh(); }); });
    range.disabled = true; prev.disabled = true; next.disabled = true; mute.textContent = 'Sound on';
    if (!D) { [yrange, tprev, tnext, tplay].forEach(function (e) { if (e) e.disabled = true; }); }

    // the picture of the static, drawn only while the tuner is on screen
    if (cv && cv.getContext && !reduce) {
      var ctx = cv.getContext('2d'), timer = null, vis = true;
      var draw = function () {
        var v = parseInt(range.value, 10), a = on ? Math.round(255 * (0.12 + 0.88 * (1 - prox(v)))) : 10;
        noise(ctx, cv.width, cv.height, a);
      };
      var loop = function () { if (vis && !timer) timer = setInterval(draw, 90); if (!vis && timer) { clearInterval(timer); timer = null; } };
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; loop(); }).observe(cv);
      loop(); draw();
    } else if (cv && cv.getContext) { noise(cv.getContext('2d'), cv.width, cv.height, 60); }
    buildYearBar();
    setBand('AM');
  })();

  // ---- Skip show 22
  (function () {
    var root = $('s22');
    if (!root) return;
    var el = { score: $('s22-score'), bar: $('s22-bar'), val: $('s22-val'), q: $('s22-q'), correct: $('s22-correct'), said: $('s22-said'),
      yes: $('s22-yes'), no: $('s22-no'), start: $('s22-start'), letters: $('s22-letters'), mood: $('s22-mood'), asked: $('s22-asked'),
      fin: $('s22-final'), form: $('s22-form'), guess: $('s22-guess'), reply: $('s22-reply'), winners: $('s22-winners') };
    if (!el.score || !el.yes || !el.no || !el.start) return;
    // value, question, the card's answer, what the contestant says, and how close that is
    var C = [
      [2, 'Which planet is known as the Red Planet?', 'Mars', 'Mars', 'exact'],
      [11, 'What is the capital of Australia?', 'Canberra', 'Sydney', 'wrong'],
      [1, 'How many strings does a standard violin have?', 'Four', 'Four', 'exact'],
      [5, 'Who painted the Mona Lisa?', 'Leonardo da Vinci', 'Da Vinci, I think', 'close'],
      [11, 'What is the chemical symbol for gold?', 'Au', 'Ag', 'wrong'],
      [1, 'How many sides has a hexagon?', 'Six', 'Six', 'exact'],
      [5, 'Which ocean lies between Africa and Australia?', 'The Indian Ocean', 'The Indian', 'close'],
      [11, 'In which year did the first moon landing take place?', '1969', 'About 1970', 'close'],
      [3, 'What is the largest mammal?', 'The blue whale', 'A whale', 'close'],
      [2, 'Which metal is liquid at room temperature?', 'Mercury', 'Mercury', 'exact'],
      [11, 'How many minutes are there in a day?', '1,440', 'About fifteen hundred', 'close'],
      [5, 'What is the tallest animal?', 'The giraffe', 'The elephant', 'wrong']
    ];
    var deck = [], cur = null, score = 0, letters = 0, asked = 0, live = false, winners = 0, tries = 0;
    var REPLIES = ['Not quite.', 'Closer, but no.', 'We were looking for something else.', 'The card says otherwise.', 'A good guess, and incorrect.', 'That was last week’s answer.', 'Disqualified on a technicality.', 'Almost. Try again.'];
    function mood() { return letters === 0 ? 'Quiet' : letters <= 2 ? 'A few letters' : letters <= 5 ? 'Mixed views' : 'The editor has noticed'; }
    function paint() {
      el.score.textContent = score; el.bar.style.width = Math.min(100, score / 22 * 100) + '%';
      el.letters.textContent = letters; el.mood.textContent = mood(); el.asked.textContent = asked;
    }
    function draw() {
      if (!deck.length) deck = shuffle(C);
      cur = deck.pop(); asked++;
      el.val.textContent = 'Worth ' + cur[0]; el.q.textContent = cur[1]; el.correct.textContent = cur[2]; el.said.textContent = cur[3];
      paint();
    }
    function decide(give) {
      if (!live || !cur) return;
      var kind = cur[4];
      if (give) { score += cur[0]; if (kind === 'wrong') letters += 2; }
      else { if (kind === 'exact') letters += 2; else if (kind === 'close') letters += 1; }
      if (score >= 22) {
        live = false; el.yes.disabled = true; el.no.disabled = true; el.start.disabled = false; el.start.textContent = 'Play again';
        el.q.textContent = 'Twenty-two. The contestant wins the round.'; el.val.textContent = 'Final score ' + score;
        el.correct.innerHTML = '&nbsp;'; el.said.innerHTML = '&nbsp;'; paint();
        if (el.fin) el.fin.hidden = false;
        return;
      }
      draw();
    }
    el.start.addEventListener('click', function () {
      score = 0; letters = 0; asked = 0; live = true; deck = shuffle(C);
      el.yes.disabled = false; el.no.disabled = false; el.start.disabled = true; el.start.textContent = 'Start the show';
      if (el.fin) el.fin.hidden = true;
      if (el.reply) el.reply.textContent = '';
      draw();
    });
    el.yes.addEventListener('click', function () { decide(true); });
    el.no.addEventListener('click', function () { decide(false); });
    if (el.form) el.form.addEventListener('submit', function (e) {
      e.preventDefault();
      tries++;
      if (el.reply) el.reply.textContent = (el.guess && el.guess.value.trim() ? REPLIES[rand(REPLIES.length)] : 'You have to say something.') + (tries > 4 ? ' (' + tries + ' tries so far.)' : '');
      if (el.winners) el.winners.textContent = winners;
    });
    paint();
  })();

  // ---- Find the Job
  (function () {
    var root = $('fj');
    if (!root) return;
    var elQs = $('fj-qs'), elJobs = $('fj-jobs'), elLog = $('fj-log'), elMsg = $('fj-msg'), elLeft = $('fj-left'), elNew = $('fj-new');
    if (!elQs || !elJobs || !elLog || !elMsg || !elLeft) return;
    var Q = ['Do they mostly work outdoors?', 'Do they wear a uniform?', 'Do they work with animals?', 'Do they work with food?', 'Do they work mainly with their hands?', 'Do they often work at night?', 'Do they usually work alone?', 'Do they look after people’s health?', 'Do they drive or fly something?', 'Do they need a formal qualification?', 'Do they sell to the public?', 'Do they work behind a counter?', 'Do they use heavy tools or machines?', 'Do they teach or advise others?'];
    //            out uni ani food hand night alone health drive qual sell counter heavy teach
    var J = [
      ['Baker',            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0]],
      ['Butcher',          [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0]],
      ['Farmer',           [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]],
      ['Vet',              [0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0]],
      ['Nurse',            [0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0]],
      ['Teacher',          [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1]],
      ['Pilot',            [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]],
      ['Firefighter',      [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0]],
      ['Postman',          [1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]],
      ['Lighthouse keeper', [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]],
      ['Tailor',           [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0]],
      ['Plumber',          [0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0]],
      ['Bus driver',       [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0]],
      ['Chef',             [0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0]],
      ['Lifeguard',        [1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0]],
      ['Shopkeeper',       [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0]]
    ];
    var mode = 'fair', asked, left, secret, over, excluded, qBtns = [], jBtns = [];
    function modeNow() { var r = root.querySelectorAll('input[name="fj-mode"]'), i; for (i = 0; i < r.length; i++) if (r[i].checked) return r[i].value; return 'fair'; }
    function cands() {
      return J.filter(function (j, ji) {
        if (excluded[ji]) return false;
        return asked.every(function (a) { return j[1][a.q] === a.ans; });
      });
    }
    function say(t) { elMsg.textContent = t; }
    function log(t) { var li = document.createElement('li'); li.textContent = t; elLog.insertBefore(li, elLog.firstChild); }
    function paint() {
      var c = cands();
      elLeft.textContent = left;
      qBtns.forEach(function (b, i) { b.disabled = over || asked.some(function (a) { return a.q === i; }); });
      jBtns.forEach(function (b, ji) { var ok = c.indexOf(J[ji]) >= 0; b.classList.toggle('out', !ok); b.disabled = over || !ok; });
    }
    function finish(win, text) { over = true; say(text); paint(); }
    function reset() {
      mode = modeNow(); asked = []; left = 20; over = false; excluded = {};
      secret = J[rand(J.length)]; elLog.innerHTML = '';
      say(mode === 'fair' ? 'The job is chosen. Ask away.' : 'No job has been chosen yet. Ask away.');
      paint();
    }
    Q.forEach(function (q, i) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = q;
      b.addEventListener('click', function () {
        if (over || left <= 0) return;
        var ans;
        if (mode === 'fair') ans = secret[1][i];
        else {
          var c = cands(), yes = c.filter(function (j) { return j[1][i] === 1; }).length, no = c.length - yes;
          ans = yes > no ? 1 : (yes < no ? 0 : rand(2));
        }
        asked.push({ q: i, ans: ans }); left--;
        log(q + ' ' + (ans ? 'Yes.' : 'No.'));
        if (left <= 0) { finish(false, mode === 'fair' ? 'Out of questions. It was the ' + secret[0].toLowerCase() + '.' : 'Out of questions. The job could still have been any of ' + cands().map(function (j) { return j[0].toLowerCase(); }).join(', ') + '.'); return; }
        say(cands().length + (cands().length === 1 ? ' job fits' : ' jobs fit') + ' what you know. ' + left + ' questions left.');
        paint();
      });
      elQs.appendChild(b); qBtns.push(b);
    });
    J.forEach(function (j, ji) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip chip-job'; b.textContent = j[0];
      b.addEventListener('click', function () {
        if (over || left <= 0) return;
        left--;
        var c = cands();
        if (mode === 'fair') {
          if (j === secret) { log('Guess: ' + j[0] + '. Correct.'); finish(true, 'Yes, the ' + j[0].toLowerCase() + '. You found it with ' + left + ' questions to spare.'); return; }
          excluded[ji] = true; log('Guess: ' + j[0] + '. No.');
        } else {
          if (c.length === 1 && c[0] === j) { log('Guess: ' + j[0] + '. Correct.'); finish(true, 'Only the ' + j[0].toLowerCase() + ' was left, so it is the ' + j[0].toLowerCase() + '. ' + left + ' questions to spare.'); return; }
          excluded[ji] = true; log('Guess: ' + j[0] + '. Not that one. (The job has moved on.)');
        }
        if (left <= 0) { finish(false, 'Out of questions.' + (mode === 'fair' ? ' It was the ' + secret[0].toLowerCase() + '.' : '')); return; }
        say(left + ' questions left.'); paint();
      });
      elJobs.appendChild(b); jBtns.push(b);
    });
    root.querySelectorAll('input[name="fj-mode"]').forEach(function (r) { r.addEventListener('change', reset); });
    if (elNew) elNew.addEventListener('click', reset);
    reset();
  })();

  // ---- Venture
  (function () {
    var root = $('vt');
    if (!root) return;
    var elRound = $('vt-round'), elFunds = $('vt-funds'), elGood = $('vt-good'), bFair = $('vt-fair'), bDip = $('vt-dip'), bHat = $('vt-hat'), bNew = $('vt-new'), elLog = $('vt-log'), elMsg = $('vt-msg');
    if (!elRound || !bFair || !bDip || !elLog || !elMsg) return;
    var funds, good, round, over, hatUsed;
    function say(t) { elMsg.textContent = t; }
    function log(t) { var li = document.createElement('li'); li.textContent = t; elLog.insertBefore(li, elLog.firstChild); }
    function paint() {
      elRound.textContent = Math.min(round, 8); elFunds.textContent = funds; elGood.textContent = good;
      bFair.disabled = over; bDip.disabled = over;
      if (bHat) bHat.hidden = over || hatUsed || round < 5;
    }
    function fold(t) { over = true; log(t); say(t); paint(); }
    function next() {
      round++;
      if (funds < -10) { fold('The venture folds. The bank will not carry the debt.'); return; }
      if (round === 6) { funds -= 15; log('Round 6. Fat’s version of Venture, backed by a soft drink maker, takes sponsorship from yours. Funds fall by 15.'); if (funds < -10) { fold('The venture folds under Fat’s take-over bid.'); paint(); return; } }
      if (round > 8) {
        over = true;
        var t = (funds >= 0 && good > -4) ? 'Eight rounds done and the venture survives, for now, with ' + funds + ' in funds and goodwill at ' + good + '. Fat’s version is still on the air.' : 'Eight rounds done. Funds ' + funds + ', goodwill ' + good + '. The venture collapses under the onslaught.';
        log(t); say(t); paint(); return;
      }
      say('Round ' + round + '. Choose how to fill it.'); paint();
    }
    function reset() {
      funds = 20; good = 0; round = 1; over = false; hatUsed = false; elLog.innerHTML = '';
      say('Choose how to fill the first round.'); paint();
    }
    bFair.addEventListener('click', function () {
      if (over) return;
      var paid = rand(10) < 6;
      if (paid) funds -= 10;
      good += 1;
      log('Round ' + round + '. A fair question. ' + (paid ? 'The contestant answers and wins 10 in prizes.' : 'The contestant misses and wins nothing.') + ' Goodwill +1.');
      next();
    });
    bDip.addEventListener('click', function () {
      if (over) return;
      var n = 10 + 5 * rand(7);
      funds += n; good -= 2;
      log('Round ' + round + '. Unlucky Dip. The contestant nominates ' + n + ' and loses it at once. Funds +' + n + ', goodwill -2.');
      next();
    });
    if (bHat) bHat.addEventListener('click', function () {
      if (over || hatUsed) return;
      hatUsed = true;
      var g = Math.max(0, 8 + 6 * good + rand(7));
      funds += g;
      log('Half time. The scorer takes the hat round the audience: ' + g + ' collected' + (good <= 0 ? ', and not warmly' : '') + '.');
      say('The hat raised ' + g + '.'); paint();
    });
    if (bNew) bNew.addEventListener('click', reset);
    reset();
  })();
})();
