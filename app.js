// ---------- ユーティリティ ----------
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmtTime = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`;

// ---------- 学習記録 (localStorage) ----------
const KEY = "toeic-app-v1";
const blank = () => ({ stats: {}, cards: {}, days: {}, rate: 1 });
let S = blank();
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

function record(it, ok) {
  const s = S.stats[it.id] || (S.stats[it.id] = { c: 0, w: 0 });
  ok ? s.c++ : s.w++;
  s.l = ok;
  const d = dateKey(new Date());
  S.days[d] = (S.days[d] || 0) + 1;
  save();
}

function streak() {
  const d = new Date();
  if (!S.days[dateKey(d)]) d.setDate(d.getDate() - 1);
  let n = 0;
  while (S.days[dateKey(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

// ---------- 問題プール ----------
// unit = まとめて出題する単位 (単問 or 1つの文書・音声に付く設問群)
const LV = { 1: "600点レベル", 2: "730点レベル", 3: "860点レベル" };
const toItems = (prefix, rows, extra) =>
  rows.map((r, j) => ({ id: `${prefix}-${j}`, cat: r[0], q: r[1], o: r.slice(2, -1), e: r[r.length - 1], ...extra }));

const SECS = {
  vocab: {
    name: "単語", desc: "頻出語の4択クイズ・単語カード", n: 10,
    units: VOCAB.map((v, i) => {
      const ds = [...new Set(shuffle(VOCAB.filter((x) => x[1] === v[1] && x[2] !== v[2])).map((x) => x[2]))].slice(0, 3);
      return { cat: LV[v[4]], items: [{ id: "v" + i, cat: LV[v[4]], q: v[0], o: [v[2], ...ds], e: `${v[0]} [${v[1]}] ${v[2]} ／ 例: ${v[3]}`, v }] };
    }),
  },
  p5: {
    name: "Part 5 文法・語彙", desc: "短文穴埋め問題", n: 10, sec: 20,
    units: PART5.map((r, i) => ({ cat: r[0], items: toItems("g" + i, [r]) })),
  },
  p7: {
    name: "Part 7 読解", desc: "メール・記事・広告などの長文", n: 6, sec: 60,
    units: PART7.map((p, i) => {
      const items = toItems("r" + i, p.q, { ctx: p.x, kind: p.k });
      return { cat: p.k, items };
    }),
  },
  lis: {
    name: "リスニング", desc: "Part 2 応答 / Part 3 会話 / Part 4 トーク", n: 10,
    units: [
      ...LISTEN2.map((r, i) => ({ cat: "Part 2 応答問題", items: toItems("l" + i, [r], { audioOnly: true, alt: i % 2 }) })),
      ...LISTEN34.map((p, i) => {
        const items = toItems("t" + i, p.q, { talk: p.s, kind: p.k });
        items[0].first = true;
        items[items.length - 1].last = true;
        return { cat: p.k, items };
      }),
    ],
  },
};
const allItems = (key) => SECS[key].units.flatMap((u) => u.items);

// 苦手優先度: 直近で不正解 > 未回答 > 正答率が低い順
function prio(it) {
  const s = S.stats[it.id];
  if (!s) return 2;
  if (!s.l) return 3;
  return s.w / (s.c + s.w);
}
function pickUnits(units, mode, n) {
  let u = shuffle(units.slice());
  const up = (x) => Math.max(...x.items.map(prio));
  if (mode === "weak") u.sort((a, b) => up(b) - up(a));
  if (mode === "wrong") u = u.filter((x) => up(x) === 3);
  const out = [];
  for (const x of u) {
    if (out.length >= n) break;
    out.push(...x.items);
  }
  return out;
}

// カテゴリ別の正答数集計
function catStats(key) {
  const m = new Map();
  for (const it of allItems(key)) {
    const c = m.get(it.cat) || { cat: it.cat, c: 0, w: 0, total: 0 };
    const s = S.stats[it.id];
    c.total++;
    if (s) { c.c += s.c; c.w += s.w; }
    m.set(it.cat, c);
  }
  return [...m.values()];
}
const pct = (c) => (c.c + c.w ? Math.round((c.c / (c.c + c.w)) * 100) + "%" : "未回答");

// ---------- 音声 (ブラウザ内蔵の読み上げ) ----------
const TTS = "speechSynthesis" in window;
const VOICE_NAMES = {
  W: ["Samantha", "Karen", "Moira", "Tessa", "Google US English", "Google UK English Female", "Zira", "Aria", "Jenny"],
  M: ["Daniel", "Alex", "Rishi", "Google UK English Male", "David", "Guy"],
};
function voiceFor(g) {
  const vs = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
  for (const n of VOICE_NAMES[g]) {
    const v = vs.find((v) => v.name.includes(n));
    if (v) return v;
  }
  return vs.find((v) => v.lang === "en-US") || vs[0];
}
// parts: [話者(M/W), 英文]
const TTS_FAIL = "音声を再生できませんでした。「▶ 音声を再生」をもう一度押し、端末の音量・消音モードを確認してください。";
const ttsMsg = (t) => { const el = $("#ttsmsg"); if (el) el.textContent = t; };
const player = new Audio();
let queue = [], lastCancel = 0, utterances = [], ttsCheck = null;
function stopSpeech() {
  queue = [];
  player.pause();
  clearTimeout(ttsCheck);
  if (!TTS || !(speechSynthesis.speaking || speechSynthesis.pending)) return;
  speechSynthesis.cancel();
  lastCancel = Date.now();
}
// 収録済みの音声ファイル (data/audio.js) を順に再生する。無い文だけブラウザの読み上げ機能で代用する
function say(parts) {
  stopSpeech();
  const files = parts.map(([g, t]) => AUDIO[g + "|" + t]);
  if (!files.every(Boolean)) return sayTTS(parts);
  queue = files;
  const next = () => {
    const f = queue.shift();
    if (!f) return;
    player.src = "audio/" + f;
    player.defaultPlaybackRate = player.playbackRate = S.rate;
    player.play().then(() => ttsMsg(""), (e) => { if (e.name !== "AbortError") ttsMsg(TTS_FAIL); });
  };
  player.onended = next;
  next();
}
function sayTTS(parts) {
  if (!TTS) return ttsMsg(TTS_FAIL);
  const list = [];
  let started = false;
  for (const [g, text] of parts) {
    // 長い発話は途中で切れることがあるため文単位に分割する
    for (const t of text.split(/(?<=[.!?])\s+/)) {
      const u = new SpeechSynthesisUtterance(t);
      const v = voiceFor(g);
      u.lang = v ? v.lang : "en-US";
      if (v) u.voice = v;
      u.rate = S.rate;
      u.onstart = () => { started = true; };
      list.push(u);
    }
  }
  utterances = list; // 参照を保持しないと再生前に破棄されることがある
  const go = () => {
    if (utterances !== list) return;
    speechSynthesis.resume();
    list.forEach((u) => speechSynthesis.speak(u));
  };
  // cancel() の直後に speak() すると無視されるブラウザがあるため少し待つ
  const wait = 250 - (Date.now() - lastCancel);
  wait > 0 ? setTimeout(go, wait) : go();
  ttsCheck = setTimeout(() => ttsMsg(started ? "" : TTS_FAIL), 3000);
}
if (TTS) speechSynthesis.getVoices();

// ---------- 画面描画 ----------
let ACT = [], MODE = "home", Q = null, F = null, timer = null;
const act = (fn) => `onclick="ACT[${ACT.push(fn) - 1}]()"`;
function view(mode, build) {
  ACT = [];
  MODE = mode;
  stopSpeech();
  utterances = [];
  if (mode !== "quiz") { clearInterval(timer); timer = null; }
  $("#app").innerHTML = build();
  window.scrollTo(0, 0);
}

function home() {
  view("home", () => {
    const today = S.days[dateKey(new Date())] || 0;
    const total = Object.values(S.days).reduce((a, b) => a + b, 0);
    let h = `<h1>TOEIC 対策</h1><div class="sub">目標 730 点 ・ 頻出パターン別トレーニング</div>
      <div class="stats"><div><b>${today}</b><span>今日の回答数</span></div><div><b>${streak()}</b><span>連続学習日数</span></div><div><b>${total}</b><span>累計回答数</span></div></div>
      <div class="grid">`;
    for (const key in SECS) {
      const items = allItems(key);
      const done = items.filter((it) => S.stats[it.id] && S.stats[it.id].l).length;
      h += `<button class="card" ${act(() => menu(key))}><h3>${SECS[key].name}</h3><div class="sub">${SECS[key].desc}</div>
        <div class="meter"><i style="width:${(done / items.length) * 100}%"></i></div><div class="sub">正解済み ${done} / ${items.length} 問</div></button>`;
    }
    h += `</div>`;

    const weak = Object.keys(SECS)
      .flatMap((key) => catStats(key).map((c) => ({ ...c, key })))
      .filter((c) => c.c + c.w >= 3 && c.w > 0)
      .sort((a, b) => a.c / (a.c + a.w) - b.c / (b.c + b.w))
      .slice(0, 5);
    h += `<h2>苦手パターン</h2>`;
    h += weak.length
      ? weak.map((c) => `<button class="row" ${act(() => startSec(c.key, "weak", c.cat))}><span>${esc(c.cat)}<br><small>${SECS[c.key].name}</small></span><small>正答率 ${pct(c)} ▶</small></button>`).join("")
      : `<div class="sub">問題を解くと、正答率の低い出題パターンがここに表示されます。</div>`;

    h += `<h2>設定</h2><div class="card">読み上げ速度
      <select onchange="S.rate=+this.value;save()">${[0.8, 0.9, 1, 1.1].map((r) => `<option value="${r}" ${S.rate === r ? "selected" : ""}>${r}倍</option>`).join("")}</select>
      <div class="btns"><button class="btn ghost" ${act(resetAll)}>学習記録をリセット</button></div>
      <div class="sub">学習記録はこのブラウザ内にのみ保存されます。</div></div>`;
    return h;
  });
}

function resetAll() {
  if (!confirm("学習記録をすべて消去します。よろしいですか？")) return;
  S = blank();
  save();
  home();
}

function menu(key) {
  view("menu", () => {
    const sec = SECS[key];
    let h = `<div class="bar"><button class="link" ${act(home)}>← ホーム</button></div><h1>${sec.name}</h1><div class="sub">${sec.desc}</div>
      <div class="btns"><button class="btn" ${act(() => startSec(key, "weak"))}>おまかせ出題 (苦手優先)</button>
      <button class="btn ghost" ${act(() => startSec(key, "random"))}>ランダム出題</button>
      <button class="btn ghost" ${act(() => startSec(key, "wrong"))}>間違えた問題を復習</button>
      ${key === "vocab" ? `<button class="btn ghost" ${act(startFlash)}>単語カード</button>` : ""}</div>`;

    const unitCats = [...new Set(sec.units.map((u) => u.cat))];
    h += `<h2>${key === "p7" ? "文書の種類から選ぶ" : "出題パターンから選ぶ"}</h2>`;
    h += unitCats.map((cat) => {
      const n = sec.units.filter((u) => u.cat === cat).reduce((a, u) => a + u.items.length, 0);
      return `<button class="row" ${act(() => startSec(key, "weak", cat))}><span>${esc(cat)}</span><small>${n} 問 ▶</small></button>`;
    }).join("");

    const cs = catStats(key);
    h += `<h2>パターン別の正答率</h2>` + cs.map((c) => `<div class="row"><span>${esc(c.cat)}</span><small>${pct(c)}</small></div>`).join("");
    return h;
  });
}

// ---------- クイズ ----------
function startSec(key, mode, cat) {
  const sec = SECS[key];
  let units = sec.units;
  if (cat) units = units.filter((u) => u.cat === cat || u.items.some((it) => it.cat === cat));
  const items = pickUnits(units, mode, sec.n);
  if (!items.length) { alert(mode === "wrong" ? "復習する問題はありません。" : "該当する問題がありません。"); return; }
  Q = { key, mode, cat, items, i: -1, right: 0, t0: Date.now(), wrong: [] };
  clearInterval(timer);
  timer = setInterval(() => { const el = $("#timer"); if (el) el.textContent = fmtTime(Date.now() - Q.t0); }, 1000);
  nextQ();
}

function nextQ() {
  Q.i++;
  if (Q.i >= Q.items.length) return result();
  const it = Q.items[Q.i];
  Q.ord = shuffle(it.o.map((_, k) => k));
  Q.picked = null;
  renderQ();
  if (it.audioOnly || it.first) playQ();
}

function playQ() {
  const it = Q.items[Q.i];
  if (it.talk) return say(it.talk);
  const [a, b] = it.alt ? ["M", "W"] : ["W", "M"];
  say([[a, it.q], ...Q.ord.flatMap((oi, k) => [[b, "ABC"[k] + "."], [b, it.o[oi]]])]);
}

function renderQ() {
  const it = Q.items[Q.i], done = Q.picked !== null, ok = done && Q.ord[Q.picked] === 0;
  const listening = it.audioOnly || it.talk;
  const showText = !it.audioOnly || done;
  view("quiz", () => {
    let h = `<div class="bar"><button class="link" ${act(() => menu(Q.key))}>← 中断</button><span>${SECS[Q.key].name}　${Q.i + 1} / ${Q.items.length}</span><span id="timer">${fmtTime(Date.now() - Q.t0)}</span></div>`;
    if (it.ctx) h += `<div class="passage"><div class="tag">${esc(it.kind)}</div>\n${esc(it.ctx)}</div>`;
    if (listening) h += `<div><span class="tag">${esc(it.kind || it.cat)}</span></div><button class="play" ${act(playQ)}>▶ 音声を再生</button><div id="ttsmsg" class="sub"></div>`;
    h += `<div class="q">${showText ? esc(it.q) : "音声を聞いて、最も適切な応答を選んでください。"}</div>`;
    h += Q.ord.map((oi, k) => {
      const cls = !done ? "" : oi === 0 ? " ok" : k === Q.picked ? " ng" : "";
      return `<button class="opt${cls}" ${done ? "disabled" : act(() => answer(k))}><b>${"ABCD"[k]}</b><span>${showText ? esc(it.o[oi]) : ""}</span></button>`;
    }).join("");
    if (done) {
      h += `<div class="exp ${ok ? "good" : "bad"}"><strong>${ok ? "正解" : "不正解"}　<span class="sub">[${esc(it.cat)}]</span></strong>${esc(it.e)}</div>`;
      if (it.talk && it.last) h += `<div class="script"><div class="sub">スクリプト</div>${it.talk.map(([g, t]) => `<p>${it.talk.length > 1 ? `<b>${g}:</b> ` : ""}${esc(t)}</p>`).join("")}</div>`;
      h += `<button class="btn" ${act(nextQ)}>${Q.i + 1 < Q.items.length ? "次へ" : "結果を見る"}</button>`;
    }
    return h;
  });
}

function answer(k) {
  if (Q.picked !== null) return;
  const it = Q.items[Q.i], ok = Q.ord[k] === 0;
  Q.picked = k;
  if (ok) Q.right++; else Q.wrong.push(it);
  record(it, ok);
  const y = window.scrollY;
  renderQ();
  window.scrollTo(0, y);
}

function result() {
  const ms = Date.now() - Q.t0, n = Q.items.length, sec = SECS[Q.key];
  view("result", () => {
    let h = `<h1 class="center">結果</h1><div class="score">${Q.right} / ${n}</div>
      <div class="center sub">正答率 ${Math.round((Q.right / n) * 100)}%　・　所要時間 ${fmtTime(ms)} (1問あたり ${Math.round(ms / n / 1000)} 秒${sec.sec ? `、本番の目安 ${sec.sec} 秒` : ""})</div>
      <div class="btns" style="justify-content:center"><button class="btn" ${act(() => startSec(Q.key, Q.mode === "wrong" ? "wrong" : "weak", Q.cat))}>続けて解く</button>
      <button class="btn ghost" ${act(() => menu(Q.key))}>メニューへ</button><button class="btn ghost" ${act(home)}>ホームへ</button></div>`;
    if (Q.wrong.length) {
      h += `<h2>間違えた問題</h2>` + Q.wrong.map((it) => `<div class="card"><div class="sub">[${esc(it.cat)}]</div><div>${esc(it.q)}</div><div><b>正解:</b> ${esc(it.o[0])}</div><div class="sub">${esc(it.e)}</div></div>`).join("");
    }
    return h;
  });
}

// ---------- 単語カード ----------
// S.cards[id] = 習熟度 (0〜5)。低いものから20枚出題する
function startFlash() {
  const items = shuffle(allItems("vocab")).sort((a, b) => (S.cards[a.id] || 0) - (S.cards[b.id] || 0)).slice(0, 20);
  F = { items, i: 0, flip: false, known: 0 };
  renderF();
}

function renderF() {
  if (F.i >= F.items.length) {
    return view("result", () => `<h1 class="center">単語カード 終了</h1><div class="score">${F.known} / ${F.items.length}</div><div class="center sub">覚えていた単語</div>
      <div class="btns" style="justify-content:center"><button class="btn" ${act(startFlash)}>次の20枚</button><button class="btn ghost" ${act(() => menu("vocab"))}>メニューへ</button></div>`);
  }
  const it = F.items[F.i], [w, pos, mean, ex, lv] = it.v;
  view("flash", () => `<div class="bar"><button class="link" ${act(() => menu("vocab"))}>← 中断</button><span>単語カード　${F.i + 1} / ${F.items.length}</span><span>${LV[lv]}</span></div>
    <div class="card flash" ${act(flipF)}><div class="word">${esc(w)}</div><div class="sub">[${pos}]</div>
    ${F.flip ? `<div class="mean">${esc(mean)}</div><div class="ex">${esc(ex)}</div>` : `<div class="sub" style="margin-top:24px">タップして意味を表示</div>`}</div>
    <div class="btns" style="justify-content:center"><button class="btn ghost" ${act(() => say([["W", w], ["W", ex]]))}>▶ 発音</button>
    ${F.flip ? `<button class="btn ghost" ${act(() => markF(false))}>まだ</button><button class="btn" ${act(() => markF(true))}>覚えた</button>` : ""}</div>`);
}
function flipF() { F.flip = !F.flip; renderF(); }
function markF(known) {
  const id = F.items[F.i].id;
  S.cards[id] = known ? Math.min((S.cards[id] || 0) + 1, 5) : 0;
  if (known) F.known++;
  save();
  F.i++;
  F.flip = false;
  renderF();
}

// ---------- キーボード操作 ----------
// クイズ: 1〜4 / A〜D で解答、Enter で次へ。単語カード: Space でめくる
document.addEventListener("keydown", (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (MODE === "quiz") {
    const k = "1234".indexOf(e.key) >= 0 ? "1234".indexOf(e.key) : "abcd".indexOf(e.key.toLowerCase());
    if (Q.picked === null && k >= 0 && k < Q.ord.length) answer(k);
    else if (Q.picked !== null && e.key === "Enter") { e.preventDefault(); nextQ(); }
  } else if (MODE === "flash" && e.key === " ") {
    e.preventDefault();
    flipF();
  }
});

home();
