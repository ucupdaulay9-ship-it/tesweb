const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const colors = ['#d98e96', '#f2b8bd', '#c9a36a', '#8a5a48', '#fbe3d6'];
const fmt = n => n.toLocaleString('id-ID');
CONFIG.birth = CONFIG.birth || '2007-11-26T00:00:00';
CONFIG.lifeQuotes = CONFIG.lifeQuotes || [
  'Setiap tahun kehadiranmu membuat dunia ini lebih indah, dan hidupku jauh lebih berwarna.',
  'Ribuan hari telah kamu lewati, dan aku bersyukur menjadi bagian dari sebagian kecilnya.',
  'Setiap jam sejak kamu lahir, dunia punya satu alasan lagi untuk tersenyum.',
  'Tiap menit hidupmu berharga, dan aku ingin menemanimu di sebanyak mungkin menit yang tersisa.',
  'Bahkan di detik ini, napasmu adalah alasan aku bersyukur.'
];
const OWN = new Set(['letter', 'map', 'cake', 'reasons', 'end']); // scene dengan latar penuh sendiri: kelopak tidak digambar (hemat tenaga)

/* ---------- render isi dari CONFIG ---------- */
$('#gname').textContent = CONFIG.name;
$('#endname').textContent = 'Selamat Ulang Tahun, ' + CONFIG.name + ' 🤎';
$('#stext').textContent = CONFIG.secret;
$('#gal').innerHTML = CONFIG.photos.map((p, i) =>
  `<figure class="pol" style="--r:${[-4, 3, 2, -3][i % 4]}deg"><div class="ph"><img src="${p.src}" alt="" loading="lazy" onerror="this.replaceWith('📸')"></div><figcaption>${p.cap}</figcaption></figure>`).join('');
$('#tl').innerHTML = CONFIG.timeline.map(i => `<div><article class="tcard">${i.img ? `<img class="timg" src="${i.img}" alt="" loading="lazy" onerror="this.remove()">` : ''}<b>${i.d}</b><h3>${i.t}</h3>${String(i.x).split(/\n\s*\n/).map(p => `<p>${p}</p>`).join('')}</article></div>`).join('');
$('#rg').innerHTML = CONFIG.reasons.map((r, i) => `<div class="rc" style="--i:${i}"><div class="ri"><div class="rf"><svg class="hrt" viewBox="0 0 64 58" aria-hidden="true"><path d="M32 55C9 38 1 25 7 14C13 4 27 6 32 16C37 6 51 4 57 14C63 25 55 38 32 55Z" fill="url(#hg)" stroke="#f0d69a" stroke-width="1.2"/><path d="M14 17c3-5 9-6 13-3" stroke="rgba(255,255,255,.75)" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg><span class="rn">${i + 1}</span><small>alasan</small></div><div class="rb"><i>${i + 1}</i><p>${r}</p></div></div></div>`).join('');
$('#cwa').href = 'https://wa.me/' + (CONFIG.wa || '') + '?text=' + encodeURIComponent(CONFIG.waText || 'Terima kasih sayang, aku suka banget ❤️');
if (CONFIG.voice) $('#voice').hidden = false;
buildCake(); buildMap(); $$('.bq').forEach(b => b.innerHTML = buildBouquet());
const UNITS = [['ny', 'Tahun', '🎂'], ['nd', 'Hari', '🌙'], ['nh', 'Jam', '⏳'], ['nm', 'Menit', '🕰️'], ['ns', 'Detik', '✨']];
$('#tg').innerHTML = UNITS.map((u, i) => `<div class="tc"><div class="ti"><div class="tf"><span class="ic">${u[2]}</span><b id="${u[0]}">0</b><small>${u[1]}</small>${i === 0 ? '<span class="ic ic2">🎂</span><span class="nxt" id="nxt"></span>' : ''}</div><div class="tb"><p>${CONFIG.lifeQuotes[i]}</p><em>${u[1]} di dunia</em></div></div></div>`).join('');
$('#cintro').textContent = 'Sejak ' + new Date(CONFIG.birth).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ', kamu sudah ada di dunia selama…';
$$('.tc').forEach(c => c.onclick = e => { e.stopPropagation(); const was = c.classList.contains('flip'); $$('.tc').forEach(x => x.classList.remove('flip')); if (!was) c.classList.add('flip'); });
document.addEventListener('click', () => $$('.tc.flip').forEach(x => x.classList.remove('flip')));
$('#kmt').textContent = 'perkiraan jarak lewat darat • ' + CONFIG.map.time;

/* ---------- navigasi scene ---------- */
let cur = 'gate';
const enter = {
  count: () => setTimeout(startCount, 1100),
  greet: () => setTimeout(greet, 900),
  letter: resetLetter,
  gallery: () => {
    $$('.pol').forEach(p => p.classList.remove('in'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const p = e.target; setTimeout(() => p.classList.add('in'), (+p.dataset.k % 4) * 180); io.unobserve(p); } }), { root: $('#gallery'), threshold: .2 });
    $$('.pol').forEach((p, i) => { p.dataset.k = i; io.observe(p); });
  },
  timeline: () => $$('#tl div').forEach((d, i) => setTimeout(() => d.classList.add('show'), 600 + i * 700)),
  reasons: startReasons,
  map: () => setTimeout(runMap, 1000),
  cake: () => {},
  end: () => {
    $('#skyEnd').classList.add('on'); hearts(30); fireworks(3); const t = $('#endtext'); t.textContent = ''; $$('.bq').forEach(b => b.classList.remove('on'));
    $('#ctirai').classList.remove('show');
    setTimeout(() => $$('.bq').forEach(b => b.classList.add('on')), 700);
    setTimeout(() => typeTo(t, CONFIG.ending, 55).then(() => $('#ctirai').classList.add('show')), 800);
  }
};
const hist = []; let busy = false;
function go(id, back) {
  if (busy) return; busy = true;
  if (cur === 'video') vid.pause();
  if (cur === 'reasons') stopReasons();
  $$('.bq').forEach(b => b.classList.remove('on')); $('#skyEnd').classList.remove('on'); skipT = false;
  if (!back) hist.push(cur);
  $('#' + cur).classList.remove('on');
  setTimeout(() => {
    const s = $('#' + id); s.classList.add('on'); s.scrollTop = 0; cur = id; busy = false;
    $('#back').hidden = hist.length < 2; (enter[id] || (() => {}))();
  }, 450);
}
$('#back').onclick = () => { if (hist.length > 1 && !busy) go(hist.pop(), true); };
$$('[data-next]').forEach(b => b.addEventListener('click', () => go(b.dataset.next)));

/* ---------- musik ---------- */
const bgm = $('#bgm'); let playing = false;
if (CONFIG.music) bgm.src = CONFIG.music; else $('#mus').hidden = true;
const playM = () => bgm.play().then(() => { playing = true; $('#mus').textContent = '🎵'; }).catch(() => {});
$('#mus').onclick = () => { if (playing) { bgm.pause(); playing = false; $('#mus').textContent = '🔇'; } else playM(); };

/* ---------- kelopak jatuh ---------- */
const pc = $('#petals'), px = pc.getContext('2d'); let P = [];
function rs() { pc.width = fx.width = innerWidth; pc.height = fx.height = innerHeight; }
const fx = $('#fx'), fc = fx.getContext('2d'); rs(); addEventListener('resize', rs);
for (let i = 0; i < 34; i++) P.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: 6 + Math.random() * 8, s: .4 + Math.random() * .9, w: Math.random() * 6, c: colors[i % 3], a: .35 + Math.random() * .4 });

/* ---------- konfeti & kembang api ---------- */
let F = [];
const confetti = () => { for (let i = 0; i < 140; i++) F.push({ t: 'r', x: fx.width / 2, y: fx.height * .45, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 3, w: 5 + Math.random() * 6, c: colors[i % 5], r: Math.random() * 6, l: 160 }); };
function fireworks(n) {
  for (let k = 0; k < n; k++) setTimeout(() => {
    const x = fx.width * (.2 + Math.random() * .6), y = fx.height * (.2 + Math.random() * .3), c = colors[k % 5];
    for (let i = 0; i < 50; i++) { const a = i / 50 * 6.283, v = 2 + Math.random() * 4; F.push({ t: 'c', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: 2.5, c, r: 0, l: 90 }); }
  }, k * 600);
}
(function loop() {
  px.clearRect(0, 0, pc.width, pc.height);
  if (!OWN.has(cur) && !document.body.classList.contains('cc')) P.forEach(p => { p.y += p.s; p.w += .02; p.x += Math.sin(p.w) * .7; if (p.y > pc.height + 20) { p.y = -20; p.x = Math.random() * pc.width; }
    px.save(); px.translate(p.x, p.y); px.rotate(p.w); px.globalAlpha = p.a; px.fillStyle = p.c; px.beginPath(); px.ellipse(0, 0, p.r, p.r * .6, 0, 0, 7); px.fill(); px.restore(); });
  fc.clearRect(0, 0, fx.width, fx.height);
  F = F.filter(p => p.l > 0);
  F.forEach(p => { p.vy += p.t === 'r' ? .25 : .05; p.x += p.vx; p.y += p.vy; p.r += .2; p.l--;
    fc.save(); fc.globalAlpha = Math.min(1, p.l / 40); fc.fillStyle = p.c; fc.translate(p.x, p.y);
    if (p.t === 'r') { fc.rotate(p.r); fc.fillRect(-p.w / 2, -p.w / 4, p.w, p.w / 2); } else { fc.beginPath(); fc.arc(0, 0, p.w, 0, 7); fc.fill(); }
    fc.restore(); });
  requestAnimationFrame(loop);
})();

/* ---------- hati melayang, jejak kursor, parallax ---------- */
function hearts(n) {
  for (let i = 0; i < n; i++) setTimeout(() => {
    const s = document.createElement('span'); s.textContent = ['💗', '🤎', '🤍', '💕'][i % 4];
    s.style.left = Math.random() * 100 + '%'; s.style.fontSize = 14 + Math.random() * 20 + 'px'; s.style.animationDuration = 5 + Math.random() * 4 + 's';
    $('#hearts').appendChild(s); setTimeout(() => s.remove(), 9500);
  }, i * 250);
}
let lastT = 0;
addEventListener('pointermove', e => {
  const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
  $('.b1').style.transform = `translate(${x * 40}px,${y * 40}px)`; $('.b2').style.transform = `translate(${x * -50}px,${y * -50}px)`;
  const now = Date.now(); if (now - lastT < 70) return; lastT = now;
  const t = document.createElement('span'); t.className = 'trail'; t.textContent = '❤'; t.style.color = colors[now % 3];
  t.style.left = e.clientX - 7 + 'px'; t.style.top = e.clientY - 7 + 'px'; document.body.appendChild(t); setTimeout(() => t.remove(), 900);
});

/* ---------- 1. gembok ---------- */
let tries = 0;
$('#open').onclick = () => {
  if ($('#ans').value === CONFIG.date) {
    $('#lock').textContent = '🔓'; $('#lock').classList.add('open'); $('#hint').textContent = 'Benar! 🤍'; hearts(10); playM();
    setTimeout(() => go('count'), 1100);
  } else {
    tries++; const b = $('#open'); b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
    $('#hint').textContent = tries >= 2 ? CONFIG.hint : 'Hmm, belum tepat. Coba ingat lagi ya 🥺';
  }
};

/* ---------- 2. hitung kebersamaan ---------- */
function tickCount() {
  const b = new Date(CONFIG.birth), n = new Date(), ms = Math.max(0, n - b) || 0;
  let y = n.getFullYear() - b.getFullYear(); if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds())) y--; y = Math.max(0, y);
  [y, Math.floor(ms / 864e5), Math.floor(ms / 36e5), Math.floor(ms / 6e4), Math.floor(ms / 1e3)].forEach((v, i) => { const el = $('#' + ['ny', 'nd', 'nh', 'nm', 'ns'][i]); if (el) el.textContent = fmt(v); });
  const nx = $('#nxt');
  if (nx) { const today = new Date(n.getFullYear(), n.getMonth(), n.getDate()); let nb = new Date(n.getFullYear(), b.getMonth(), b.getDate()); if (nb < today) nb = new Date(n.getFullYear() + 1, b.getMonth(), b.getDate()); const left = Math.round((nb - today) / 864e5); nx.textContent = left === 0 ? 'Hari ini ulang tahunmu! 🎂' : left + ' hari lagi menuju ' + (y + 1) + ' tahun 🎂'; }
}
function startCount() { setTimeout(() => { $('#cnote').classList.add('show'); $('#ctip').classList.add('show'); $('#cgo').classList.add('show'); }, 1200); }

/* ---------- 3. ucapan ---------- */
function greet() {
  const t = 'Selamat ulang tahun,'; let i = 0; $('#typed').textContent = '';
  const iv = setInterval(() => {
    $('#typed').textContent = t.slice(0, ++i);
    if (i >= t.length) { clearInterval(iv); $('#gname').classList.add('show'); confetti(); hearts(14); setTimeout(() => $('#greet button').classList.add('show'), 1400); }
  }, 85);
}

/* ---------- 4. amplop & surat ---------- */
let letterDone = false, lrun = 0, skipT = false, writing = false;
function renderPaper(full) {
  const P = $('#paper');
  P.innerHTML = '<h2>Untuk ' + CONFIG.name + '</h2><div class="orn">❦</div>' + CONFIG.letter.map(t => '<p class="show">' + (full ? t : '') + '</p>').join('') + '<div class="sign">' + (full ? CONFIG.from : '') + '</div>';
  P.hidden = false;
}
function resetLetter() {
  lrun++; writing = false; skipT = false; const e = $('#env'); e.className = 'env3'; e.hidden = false; $('#voice').classList.remove('show'); $('#lnext').classList.remove('show'); $('#paper').hidden = true;
  if (letterDone) { e.hidden = true; renderPaper(true); $('#voice').classList.add('show'); $('#lnext').classList.add('show'); }
}
async function writeLetter() {
  const my = ++lrun; skipT = false; writing = true; renderPaper(false); const ps = $$('#paper p');
  for (let i = 0; i < ps.length; i++) {
    await typeTo(ps[i], CONFIG.letter[i], 32); if (my !== lrun) return;
    if (!skipT) await new Promise(r => setTimeout(r, 500)); if (my !== lrun) return;
  }
  await typeTo($('#paper .sign'), CONFIG.from, 70); if (my !== lrun) return;
  letterDone = true; writing = false; skipT = false; hearts(12); $('#voice').classList.add('show'); $('#lnext').classList.add('show');
}
function goldBurst(x, y) {
  for (let i = 0; i < 60; i++) { const a = Math.random() * 6.283, v = 1 + Math.random() * 5; F.push({ t: 'c', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, w: 1.5 + Math.random() * 2, c: ['#f0d69a', '#ffe9b8', '#e9a3ab'][i % 3], r: 0, l: 80 + Math.random() * 40 }); }
}
$('#env').onclick = () => {
  const e = $('#env'); if (e.classList.contains('open')) return; e.classList.add('open');
  const r = e.getBoundingClientRect(); goldBurst(r.left + r.width / 2, r.top + r.height * .5);
  setTimeout(() => e.classList.add('gone'), 1900);
  setTimeout(() => { e.hidden = true; writeLetter(); }, 2800);
};
$('#letter').addEventListener('click', () => { if (writing) skipT = true; });
let va; $('#voice').onclick = () => { if (!va) va = new Audio(CONFIG.voice); va.paused ? (bgm.volume = .25, va.play()) : (va.pause(), bgm.volume = 1); if (va) va.onended = () => bgm.volume = 1; };

/* ---------- 7. kartu alasan ---------- */
$$('.rc').forEach(c => c.onclick = () => {
  c.classList.add('flip');
  if ($$('.rc.flip').length === $$('.rc').length) { $('#rnext').classList.add('show'); confetti(); }
});

/* ---------- 8. tiup lilin ---------- */
let lit = 3;
function out(f) {
  if (f.classList.contains('off')) return; f.classList.add('off'); lit--;
  if (!lit) { $('#chint').textContent = 'Harapanmu mulai terbang… 🕊️'; fireworks(2); $('#blow').hidden = true; setTimeout(releaseWish, 900); }
}
$$('.cd').forEach(c => c.onclick = () => out(c.querySelector('.f')));
$('#blow').onclick = async () => {
  try {
    const s = await askMic(), ac = new AudioContext(), an = ac.createAnalyser(), d = new Uint8Array(an.fftSize);
    ac.createMediaStreamSource(s).connect(an); $('#chint').textContent = 'Ayo tiup ke arah mikrofon… 🌬️';
    (function ck() {
      an.getByteTimeDomainData(d); let m = 0; d.forEach(v => m = Math.max(m, Math.abs(v - 128)));
      if (m > 70) { $$('.f').forEach((f, i) => setTimeout(() => out(f), i * 300)); s.getTracks().forEach(t => t.stop()); return; }
      if (lit) requestAnimationFrame(ck);
    })();
  } catch (e) { $('#chint').textContent = 'Mikrofon tidak tersedia, sentuh apinya saja ya 🕯️'; }
};

/* ---------- 9. penutup & easter egg ---------- */
$('#cagain').onclick = () => location.reload();
let eg = 0, egT; $('#egg').onclick = () => {
  eg++; clearTimeout(egT); egT = setTimeout(() => eg = 0, 1200);
  if (eg >= 3) { eg = 0; $('#secret').classList.add('on'); hearts(10); }
};
$('#sclose').onclick = () => $('#secret').classList.remove('on');

/* ---------- efek mengetik ---------- */
function typeTo(el, text, sp = 45) {
  return new Promise(res => {
    const ch = [...text]; let i = 0; el.textContent = ''; el.classList.add('caret');
    (function n() {
      if (skipT) i = ch.length - 1;
      el.textContent = ch.slice(0, ++i).join('');
      const sc = el.closest('.scene'); if (sc && sc.scrollHeight > sc.clientHeight) sc.scrollTop = sc.scrollHeight;
      if (i < ch.length) setTimeout(n, /[.,!?]/.test(ch[i - 1]) ? sp * 6 : sp); else { el.classList.remove('caret'); res(); }
    })();
  });
}

/* ---------- video sinematik ---------- */
const vid = $('#vid'); let wasP = false;
if (CONFIG.video) vid.src = CONFIG.video; else $('#vph').hidden = false;
vid.addEventListener('error', () => $('#vph').hidden = false);
vid.addEventListener('play', () => { $('#vt').classList.add('gone'); if (playing) { bgm.pause(); playing = false; wasP = true; $('#mus').textContent = '🔇'; } });
const back = () => { if (wasP) { wasP = false; playM(); } };
vid.addEventListener('pause', back); vid.addEventListener('ended', back);

/* ---------- layar penuh ---------- */
const de = document.documentElement, reqFS = de.requestFullscreen || de.webkitRequestFullscreen;
const isFS = () => document.fullscreenElement || document.webkitFullscreenElement;
if (!reqFS) { $('#fs').hidden = true; $('#cfs').hidden = true; }
function toggleFS() {
  if (isFS()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  else { try { const r = reqFS.call(de); if (r && r.catch) r.catch(() => {}); } catch (e) {} }
}
$('#fs').onclick = toggleFS; $('#cfs').onclick = toggleFS;
['fullscreenchange', 'webkitfullscreenchange'].forEach(ev => document.addEventListener(ev, () => {
  $('#fs').textContent = isFS() ? '🗗' : '⛶';
  $('#cfs').textContent = isFS() ? '🗗 Kecilkan layar' : '⛶ Perbesar layar';
}));

/* ---------- foto: klik untuk timbul & membesar ---------- */
$$('.pol').forEach(p => p.onclick = () => { const was = p.classList.contains('pop'); $$('.pol').forEach(x => x.classList.remove('pop')); if (!was) p.classList.add('pop'); });

/* ---------- peta jarak (versi ringan) ---------- */
function buildMap() {
  const MAPD = 'M66,95 C96,158 140,169 158,224 S210,306 250,333 S268,351 274,356';
  const land = 'M0,69 C30,77 50,87 66,92 S110,119 134,148 S165,185 178,206 S195,259 205,275 S225,298 232,298 S262,317 288,322 S306,367 312,380 S334,407 346,420 L360,436 L0,436 Z';
  const em = (c, x, y, s = 20) => `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle">${c}</text>`;
  const patches = [[60, 230, 22, 13], [112, 300, 26, 15], [170, 330, 22, 13], [40, 380, 26, 15], [110, 410, 24, 12]].map(p => `<ellipse cx="${p[0]}" cy="${p[1]}" rx="${p[2]}" ry="${p[3]}" class="pat"/>`).join('');
  const spark = [[250, 60], [330, 60], [160, 40], [300, 150], [340, 232], [120, 60], [230, 110], [345, 120], [270, 270], [330, 330]].map(p => `<text x="${p[0]}" y="${p[1]}" font-size="10" fill="#fff" opacity=".85" text-anchor="middle">✦</text>`).join('');
  const flowers = [[90, 262], [140, 292], [200, 362], [60, 334], [40, 300]].map(p => em('🌺', p[0], p[1], 12)).join('');
  const band = (w, a) => `<path d="${land}" fill="none" stroke="rgba(255,255,255,${a})" stroke-width="${w}" stroke-linejoin="round"/>`;
  $('#msvg').innerHTML = `<defs>
  <linearGradient id="gs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--sea1)"/><stop offset="1" style="stop-color:var(--sea2)"/></linearGradient>
  <linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--land1)"/><stop offset="1" style="stop-color:var(--land2)"/></linearGradient>
  <radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="rgba(91,58,46,0)"/><stop offset="1" stop-color="rgba(91,58,46,.32)"/></radialGradient>
  <pattern id="wv" width="44" height="26" patternUnits="userSpaceOnUse"><path d="M0 13q5.5-6 11 0t11 0t11 0t11 0" stroke="rgba(255,255,255,.5)" fill="none" stroke-width="1.2"/></pattern>
  <pattern id="dt" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1" fill="rgba(185,141,106,.4)"/><circle cx="9" cy="9" r=".8" fill="rgba(185,141,106,.3)"/></pattern></defs>
  <rect class="sea" width="360" height="436"/><rect width="360" height="436" fill="url(#wv)"/>
  <path d="M236 0H300L360 150V70Z" fill="rgba(255,255,255,.14)"/><path d="M130 0H170L360 250V190Z" fill="rgba(255,255,255,.09)"/>
  ${band(40, .12)}${band(26, .22)}${band(13, .55)}
  <path d="${land}" class="land"/><path d="${land}" fill="url(#dt)"/>${patches}${flowers}${spark}
  <text x="84" y="200" class="mlb" transform="rotate(38 84 200)">ACEH</text><text x="130" y="292" class="mlb" transform="rotate(38 130 292)">SUMATERA UTARA</text>
  <text x="272" y="150" class="sl" transform="rotate(38 272 150)">Selat Malaka</text>
  ${em('🏔️', 44, 270, 26)}${em('🏔️', 84, 330, 22)}${em('🌴', 120, 161, 18)}${em('🌳', 150, 346, 18)}${em('🌴', 40, 160, 16)}${em('🕌', 36, 122, 18)}${em('🚉', 300, 404, 16)}${em('🌾', 210, 424, 14)}
  ${em('🐋', 210, 148, 26)}${em('🏝️', 322, 118, 22)}${em('🐬', 232, 206, 18)}${em('🚤', 322, 262, 18)}${em('⛵', 262, 232, 20)}${em('☁️', 190, 53, 24)}${em('☁️', 300, 92, 20)}${em('💗', 200, 100, 12)}${em('💗', 292, 206, 12)}
  <g transform="translate(316 188)"><circle r="21" fill="rgba(255,255,255,.7)" stroke="#c9a36a" stroke-width="1.2"/><path d="M0,-17L5,0L0,17L-5,0Z" fill="#d98e96"/><path d="M-17,0L0,-5L17,0L0,5Z" fill="#c9a36a" opacity=".7"/><text y="-25" class="pt3">U</text></g>
  <rect width="360" height="436" fill="url(#vg)"/>
  ${em('⭐', 224, 326, 12)}<text x="224" y="343" class="pt3">Medan</text>
  ${em('📍', 66, 92, 24)}<rect x="78" y="66" width="100" height="34" rx="10" class="pill"/><text x="128" y="80" class="pt1">${CONFIG.map.from}</text><text x="128" y="94" class="pt2">Aku di sini 🧑</text>
  ${em('💗', 274, 336, 18)}${em('📍', 274, 356, 24)}<rect x="146" y="368" width="108" height="34" rx="10" class="pill"/><text x="200" y="382" class="pt1">${CONFIG.map.to}</text><text x="200" y="396" class="pt2">Hafsyah di sini 💗</text>
  <rect x="5" y="5" width="350" height="426" rx="17" fill="none" stroke="#c9a36a" stroke-width="2"/><rect x="10" y="10" width="340" height="416" rx="13" fill="none" stroke="#c9a36a" stroke-width=".8" stroke-opacity=".7"/>
  <text x="19" y="23" font-size="11" fill="#c9a36a">✦</text><text x="341" y="23" font-size="11" fill="#c9a36a" text-anchor="end">✦</text><text x="19" y="428" font-size="11" fill="#c9a36a">✦</text><text x="341" y="428" font-size="11" fill="#c9a36a" text-anchor="end">✦</text>`;
  $('#msvg2').innerHTML = `<path d="${MAPD}" id="rt" class="rtb"/><path d="${MAPD}" id="rp" class="rtp" pathLength="1"/><text id="mv" font-size="20" text-anchor="middle" transform="translate(66 86)">💌</text>`;
  const km = CONFIG.map.km;
  $('#facts').innerHTML = [['👣', '± ' + fmt(Math.round(km * 1333)) + ' langkah'], ['🎵', '± ' + fmt(Math.round(km / 45 * 60 / 3.5)) + ' lagu'], ['⏱️', CONFIG.map.time]].map(f => `<span>${f[0]} ${f[1]}</span>`).join('');
}
let mapTok = 0;
function runMap() {
  const svg = $('#msvg2'), rt = $('#rt'), rp = $('#rp'), mv = $('#mv'), L = rt.getTotalLength(), my = ++mapTok;
  const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
  ['#mtext', '#mgo', '#facts'].forEach(s => $(s).classList.remove('show')); $('#mtext').textContent = ''; $('#kmv').textContent = '0'; rp.style.strokeDashoffset = 1;
  const t0 = performance.now(), D = 6500; let lastH = 0;
  (function step(now) {
    if (my !== mapTok) return;
    const k = Math.min(1, (now - t0) / D), e = ease(k), pt = rt.getPointAtLength(e * L);
    rp.style.strokeDashoffset = 1 - e; mv.setAttribute('transform', `translate(${pt.x} ${pt.y - 8})`); $('#kmv').textContent = fmt(Math.round(e * CONFIG.map.km));
    if (now - lastH > 280 && k < 1) {
      lastH = now; const r = svg.getBoundingClientRect(), tt = document.createElement('span'); tt.className = 'trail'; tt.textContent = '💗';
      tt.style.left = r.left + pt.x / 360 * r.width + 'px'; tt.style.top = r.top + pt.y / 436 * r.height + 'px'; document.body.appendChild(tt); setTimeout(() => tt.remove(), 900);
    }
    if (k < 1) requestAnimationFrame(step);
    else { hearts(10); $('#facts').classList.add('show'); $('#mtext').classList.add('show'); typeTo($('#mtext'), CONFIG.map.text, 38).then(() => $('#mgo').classList.add('show')); }
  })(t0);
}

/* ---------- kue mewah ---------- */
function buildCake() {
  const sc = (n, x0, dx, y, r, f) => Array.from({ length: n }, (_, i) => `<circle cx="${x0 + i * dx}" cy="${y}" r="${r}" fill="${f}"/>`).join('');
  const rose = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-11" cy="6" rx="7" ry="3" fill="#c9a36a" transform="rotate(-30 -11 6)"/><ellipse cx="11" cy="6" rx="7" ry="3" fill="#c9a36a" transform="rotate(30 11 6)"/><circle r="9" fill="#e0687f"/><path d="M-5 -1a5 5 0 0 1 9 -2M-3 3a5 5 0 0 0 7 -3M0 -4a3 3 0 0 1 3 3" stroke="#fbd5dc" stroke-width="1.3" fill="none"/></g>`;
  const g = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  const sp = [[14, 60], [286, 92], [22, 150], [282, 36], [150, 18]].map((p, i) => `<text x="${p[0]}" y="${p[1]}" font-size="14" fill="#c9a36a" class="spk" style="animation-delay:${i * .4}s">✦</text>`).join('');
  const svg = `<svg viewBox="0 0 300 270"><defs>${g('gR', '#eaa6b0', '#c46d7a')}${g('gM', '#8a5a48', '#5b3a2e')}${g('gC', '#fffaf3', '#f1d9c8')}<linearGradient id="gG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a97f3e"/><stop offset=".5" stop-color="#f0d69a"/><stop offset="1" stop-color="#a97f3e"/></linearGradient></defs>
  <ellipse cx="150" cy="250" rx="142" ry="11" fill="url(#gG)"/><ellipse cx="150" cy="246" rx="132" ry="8" fill="#fff3d6" opacity=".5"/>
  <rect x="30" y="170" width="240" height="72" rx="12" fill="url(#gR)"/><rect x="30" y="208" width="240" height="5" fill="url(#gG)"/>${sc(12, 40, 20, 170, 10, '#fff3e6')}${sc(15, 44, 16, 228, 3, '#fff3d6')}
  <rect x="62" y="112" width="176" height="60" rx="10" fill="url(#gM)"/><rect x="62" y="150" width="176" height="4" fill="url(#gG)"/>${sc(10, 71, 18, 112, 9, '#fff3e6')}${sc(11, 72, 16, 164, 2.5, '#f0d69a')}
  <rect x="96" y="60" width="108" height="54" rx="9" fill="url(#gC)" stroke="#c9a36a" stroke-width="1.5"/>${sc(6, 105, 18, 60, 9, '#eaa6b0')}
  <text x="150" y="102" text-anchor="middle" font-family="Great Vibes,cursive" font-size="38" fill="#b9707a" stroke="#c9a36a" stroke-width=".6">19</text>
  ${rose(78, 112)}${rose(222, 112)}${rose(44, 170, 1.15)}${rose(256, 170, 1.15)}${rose(150, 170, 1.25)}${sp}</svg>`;
  $('#cakeBox').innerHTML = svg + [132, 150, 168].map(x => `<div class="cd" style="left:${(x - 4) / 3}%"><i class="f"></i></div>`).join('');
}

/* ---------- harapan terbang ---------- */
let wish = '';
$('#wishSend').onclick = () => {
  const v = $('#wishText').value.trim();
  if (!v) { const b = $('#wishSend'); b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); $('#wishText').placeholder = 'Tulis harapanmu dulu ya 🥺'; return; }
  wish = v; $('#wishText').value = ''; const w = $('#wishStep'); w.classList.add('bye');
  setTimeout(() => { w.hidden = true; $('#blowStep').hidden = false; $('#blowStep').classList.add('rise'); }, 800);
};
function releaseWish() {
  const r = $('#cakeBox').getBoundingClientRect(), w = document.createElement('div'), s = document.createElement('span');
  s.textContent = wish; w.className = 'wishfly'; w.appendChild(s);
  w.style.left = r.left + r.width / 2 + 'px'; w.style.top = r.top + r.height * .2 + 'px'; document.body.appendChild(w);
  $('#heaven').classList.add('on');
  const iv = setInterval(() => {
    const b = w.getBoundingClientRect(), t = document.createElement('span'); t.className = 'trail'; t.textContent = ['✨', '⭐', '💫'][Math.random() * 3 | 0];
    t.style.left = b.left + b.width / 2 + (Math.random() * 40 - 20) + 'px'; t.style.top = b.top + b.height / 2 + 'px'; t.style.fontSize = '16px'; document.body.appendChild(t); setTimeout(() => t.remove(), 900);
  }, 110);
  setTimeout(() => {
    clearInterval(iv); w.remove(); fireworks(3);
    $('#chint').textContent = 'Harapanmu sudah sampai kepada Sang Pengabul segala doa 🌠 Aamiin 🤍';
    setTimeout(() => { $('#cnext').classList.add('show'); $('#heaven').classList.remove('on'); }, 1800);
  }, 7000);
}

/* ---------- buket bunga ---------- */
function buildBouquet() {
  const fl = (x, y, r, a, b) => `<g transform="translate(${x} ${y})">` + [0, 72, 144, 216, 288].map(d => `<circle cx="${(Math.cos(d * Math.PI / 180) * r * .6).toFixed(1)}" cy="${(Math.sin(d * Math.PI / 180) * r * .6).toFixed(1)}" r="${(r * .55).toFixed(1)}" fill="${a}"/>`).join('') + `<circle r="${r * .5}" fill="${b}"/><circle r="${r * .2}" fill="${a}" opacity=".7"/></g>`;
  const stems = [[100, 72], [62, 102], [138, 102], [80, 132], [120, 132], [40, 130], [160, 130]].map(s => `<path d="M100 235L${s[0]} ${s[1]}" stroke="#7f9370" stroke-width="3.5" stroke-linecap="round"/>`).join('');
  const leaves = [[48, 150, -35], [152, 150, 35], [70, 176, -20], [130, 176, 20], [30, 100, -60], [170, 100, 60]].map(l => `<ellipse cx="${l[0]}" cy="${l[1]}" rx="16" ry="6" fill="#8fa17a" transform="rotate(${l[2]} ${l[0]} ${l[1]})"/>`).join('');
  const dots = Array.from({ length: 22 }, (_, i) => `<circle cx="${30 + (i * 53) % 140}" cy="${40 + (i * 37) % 110}" r="2.4" fill="#fffaf3"/>`).join('');
  return `<svg viewBox="0 0 200 260">${stems}${leaves}${dots}${fl(40, 130, 17, '#f2b8bd', '#fbe3d6')}${fl(160, 130, 17, '#c9707c', '#e9a3ab')}${fl(62, 102, 21, '#e9a3ab', '#fbe3d6')}${fl(138, 102, 21, '#fbe3d6', '#e9a3ab')}${fl(100, 70, 25, '#e0687f', '#f7b3c0')}${fl(80, 132, 20, '#c9707c', '#f2b8bd')}${fl(120, 132, 20, '#f2b8bd', '#fffaf3')}${fl(100, 108, 20, '#ffd1dc', '#e9a3ab')}
  <path d="M52 150L148 150L114 244L86 244Z" fill="#fbf1e6" stroke="#c9a36a" stroke-width="2"/><path d="M52 150L100 168L148 150" fill="#f1d9c8" stroke="#c9a36a" stroke-width="1.5"/>
  <path d="M96 192l-8 28M104 192l8 28" stroke="#d98e96" stroke-width="4" stroke-linecap="round"/><ellipse cx="85" cy="186" rx="13" ry="7" fill="#d98e96"/><ellipse cx="115" cy="186" rx="13" ry="7" fill="#d98e96"/><circle cx="100" cy="186" r="6" fill="#b9707a"/></svg>`;
}

/* ---------- hitung waktu: jalan terus tanpa reset ---------- */
tickCount(); setInterval(tickCount, 1000);

/* ---------- latar bokeh surat ---------- */
(() => {
  const w = $('#bkw');
  for (let i = 0; i < 24; i++) {
    const s = document.createElement('i'), big = i < 14, z = big ? 40 + Math.random() * 90 : 4 + Math.random() * 6;
    s.className = 'bk' + (big ? '' : ' sp');
    s.style.cssText = `width:${z}px;height:${z}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${-Math.random() * 9}s;animation-duration:${7 + Math.random() * 7}s`;
    w.appendChild(s);
  }
})();

/* ---------- dekorasi langit (akhir) & pesta (kue) ---------- */
const rnd = (a, b) => a + Math.random() * (b - a);
function addI(el, cls, n, st) { for (let i = 0; i < n; i++) { const s = document.createElement('i'); s.className = cls; s.style.cssText = st(i); el.appendChild(s); } }
(() => {
  const E = $('#skyEnd'), K = $('#skyCake');
  addI(E, 'st', 46, () => `left:${rnd(0, 100)}%;top:${rnd(0, 70)}%;width:${rnd(1, 3)}px;height:${rnd(1, 3)}px;animation-delay:${-rnd(0, 3)}s`);
  addI(E, 'ff', 14, () => `left:${rnd(0, 100)}%;top:${rnd(30, 95)}%;animation-duration:${rnd(7, 14)}s;animation-delay:${-rnd(0, 8)}s`);
  addI(E, 'sh', 3, i => `left:${rnd(45, 100)}%;top:${rnd(2, 30)}%;animation-delay:${i * 2.6}s`);
  addI(E, 'moon', 1, () => '');
  addI(K, 'st', 34, () => `left:${rnd(0, 100)}%;top:${rnd(0, 60)}%;width:${rnd(1, 3)}px;height:${rnd(1, 3)}px;animation-delay:${-rnd(0, 3)}s`);
  addI(K, 'ff', 10, () => `left:${rnd(0, 100)}%;top:${rnd(30, 95)}%;animation-duration:${rnd(7, 14)}s;animation-delay:${-rnd(0, 8)}s`);
  addI(K, 'bulb', 16, i => `left:${(i + .5) / 16 * 100}%;top:${8 + 20 * Math.sin(Math.PI * ((i % 4) + .5) / 4)}px;background:${['#ffd98a', '#f7a8b8', '#fff2d0'][i % 3]};animation-delay:${-(i % 5) * .5}s`);
  for (let i = 0; i < 7; i++) { const b = document.createElement('span'); b.className = 'bl'; b.textContent = '🎈'; b.style.cssText = `left:${rnd(2, 94)}%;animation-duration:${rnd(13, 22)}s;animation-delay:${-rnd(0, 18)}s;font-size:${rnd(26, 42)}px`; K.appendChild(b); }
})();

/* ---------- izin mikrofon: pulihkan layar penuh setelah dialog izin ---------- */
async function askMic() {
  const wasFS = document.fullscreenElement || document.webkitFullscreenElement;
  try { return await navigator.mediaDevices.getUserMedia({ audio: true }); }
  finally {
    if (wasFS && !(document.fullscreenElement || document.webkitFullscreenElement) && reqFS) {
      try { await reqFS.call(de); }
      catch (e) { addEventListener('click', () => { try { reqFS.call(de); } catch (e2) {} }, { once: true }); }
    }
  }
}

/* ---------- video: rasio asli, tanpa dipotong & tanpa diperbesar melebihi ukuran aslinya ---------- */
vid.addEventListener('loadedmetadata', () => {
  if (!vid.videoWidth) return; const r = vid.videoWidth / vid.videoHeight, c = $('.cine');
  c.style.aspectRatio = vid.videoWidth + '/' + vid.videoHeight; c.style.width = `min(100%, ${(70 * r).toFixed(1)}vh, ${vid.videoWidth}px)`; c.style.margin = '0 auto';
});

/* ---------- latar alasan: hati bercahaya melayang ---------- */
(() => {
  const R = $('#skyRe');
  addI(R, 'st', 14, () => `left:${rnd(0, 100)}%;top:${rnd(0, 80)}%;width:${rnd(1, 3)}px;height:${rnd(1, 3)}px;animation-delay:${-rnd(0, 3)}s`);
  const cols = ['#ff7fa6', '#f0d69a', '#e9a3ab', '#ffd1dc'];
  for (let i = 0; i < 9; i++) { const s = document.createElement('span'); s.className = 'fh'; s.textContent = '♥'; s.style.cssText = `left:${rnd(0, 96)}%;font-size:${rnd(12, 44)}px;color:${cols[i % 4]};text-shadow:0 0 8px ${cols[i % 4]};animation-duration:${rnd(12, 24)}s;animation-delay:${-rnd(0, 20)}s`; R.appendChild(s); }
})();

/* ---------- alasan: muncul bertahap saat terlihat + denyut bergantian (bukan serentak) ---------- */
let reasonObs = null, pulseT = null, pulseI = 0;
function startReasons() {
  if (!('IntersectionObserver' in window)) { $$('.rc').forEach(c => c.classList.add('in')); return; }
  if (!reasonObs) {
    reasonObs = new IntersectionObserver(es => es.forEach(e => {
      const el = e.target; el.dataset.vis = e.isIntersecting ? '1' : '';
      if (e.isIntersecting && !el.classList.contains('in')) { const k = [...el.parentNode.children].indexOf(el); setTimeout(() => el.classList.add('in'), (k % 4) * 120); }
    }), { root: $('#reasons'), threshold: .1 });
    $$('.rc').forEach(c => reasonObs.observe(c));
  }
  clearInterval(pulseT);
  pulseT = setInterval(() => {
    $$('.rc.pulse').forEach(c => c.classList.remove('pulse'));
    const vis = $$('.rc').filter(c => c.dataset.vis && !c.classList.contains('flip'));
    if (vis.length) vis[pulseI++ % vis.length].classList.add('pulse');
  }, 520);
}
function stopReasons() { clearInterval(pulseT); $$('.rc.pulse').forEach(c => c.classList.remove('pulse')); }

/* ---------- tirai pembuka & penutup ---------- */
const CT = $('#cur'); let ctP = 0, ctDrag = false, ctSX = 0, ctBusy = false, ctStarted = false;
const setInert = v => $$('.scene').forEach(s => { s.inert = v; });
const setP = p => { ctP = p; CT.style.setProperty('--p', p); };
function fadeVol(v, ms) { const a = bgm.volume, t0 = performance.now(); (function s(n) { const k = Math.max(0, Math.min(1, (n - t0) / ms)); bgm.volume = Math.max(0, Math.min(1, a + (v - a) * k)); if (k < 1) requestAnimationFrame(s); })(t0); }
setInert(true); document.body.classList.add('cc');
setTimeout(() => CONFIG.photos.forEach(p => { const i = new Image(); i.src = p.src; }), 600); // muat foto selagi tirai masih tertutup

function nudge() { CT.classList.add('snap', 'flash'); setP(.1); setTimeout(() => setP(0), 320); setTimeout(() => CT.classList.remove('flash'), 1500); }
function openCurtain() {
  const reopen = ctStarted; ctBusy = true;
  CT.classList.remove('snap', 'closing', 'vanish', 'flash'); CT.classList.add('opening'); setP(1);
  if (!reopen) { playM(); ctStarted = true; }   // layar penuh tidak lagi otomatis: pakai tombol "Perbesar layar"
  else fadeVol(1, 1400);
  // tirai menumpuk ke sisi dengan mulus, lalu memudar perlahan (tidak hilang tiba-tiba)
  setTimeout(() => { setInert(false); document.body.classList.remove('cc'); CT.classList.add('vanish'); }, 1200);
  setTimeout(() => { CT.classList.add('hide'); CT.classList.remove('opening'); ctBusy = false; }, 2200);
}
function closeCurtain() {
  if (ctBusy) return; ctBusy = true; setInert(true);
  // tirai muncul memudar (opacity 0 -> 1) sambil menutup perlahan dari sisi ke tengah
  CT.classList.remove('hide', 'snap', 'opening', 'flash', 'drag'); CT.classList.add('end', 'wait', 'vanish'); setP(1);
  void CT.offsetWidth;
  CT.classList.remove('vanish'); CT.classList.add('closing'); setP(0); fadeVol(.25, 1800);
  // teks & tombol baru muncul setelah tirai benar-benar tertutup
  setTimeout(() => { document.body.classList.add('cc'); CT.classList.remove('wait'); ctBusy = false; }, 2100);
}
CT.addEventListener('pointerdown', e => {
  if (ctBusy || e.target.closest('a,button')) return;
  if (Math.abs(e.clientX - innerWidth / 2) > innerWidth * .36) { nudge(); return; }   // mulai geser harus dari area tengah
  ctDrag = true; ctSX = e.clientX; CT.classList.remove('snap'); CT.classList.add('drag'); try { CT.setPointerCapture(e.pointerId); } catch (x) {}
});
CT.addEventListener('pointermove', e => { if (ctDrag) setP(Math.min(1, Math.abs(e.clientX - ctSX) / (innerWidth * .36))); });
function ctEnd(e) {
  if (!ctDrag) return; ctDrag = false; CT.classList.remove('drag');
  if (Math.abs(e.clientX - ctSX) < 8) { nudge(); return; }                           // hanya diketuk: kasih petunjuk
  CT.classList.add('snap'); if (ctP > .35) openCurtain(); else setP(0);
}
CT.addEventListener('pointerup', ctEnd); CT.addEventListener('pointercancel', ctEnd);
CT.addEventListener('keydown', e => { if (e.target === CT && (e.key === 'Enter' || e.key === ' ') && !ctBusy) { e.preventDefault(); openCurtain(); } });
$('#ctirai').onclick = closeCurtain;
