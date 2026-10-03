// 問題データから音声ファイル (audio/*.m4a) と対応表 (data/audio.js) を生成する。macOS 専用。
// 問題を追加・変更したら再実行する:  node tools/make-audio.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const root = path.join(__dirname, "..");
const VOICES = { W: "Samantha", M: "Daniel" };

const src = ["vocab", "part5", "part7", "listening"].map((f) => fs.readFileSync(path.join(root, "data", f + ".js"), "utf8")).join("\n");
const { VOCAB, LISTEN2, LISTEN34 } = vm.runInNewContext(src + "\n({ VOCAB, LISTEN2, LISTEN34 })");

// app.js の say() に渡される [話者, 英文] をすべて列挙する
const clips = new Set();
const add = (g, t) => clips.add(g + "|" + t);
for (const v of VOCAB) { add("W", v[0]); add("W", v[3]); }
LISTEN2.forEach((r, i) => {
  const [a, b] = i % 2 ? ["M", "W"] : ["W", "M"];
  add(a, r[1]);
  r.slice(2, 5).forEach((o) => add(b, o));
});
for (const g of "WM") for (const l of "ABC") add(g, l + ".");
for (const p of LISTEN34) for (const [g, t] of p.s) add(g, t);

const dir = path.join(root, "audio");
fs.mkdirSync(dir, { recursive: true });
const map = {};
[...clips].forEach((key, n) => {
  const [g, text] = [key[0], key.slice(2)];
  const file = String(n).padStart(4, "0") + ".m4a";
  execFileSync("say", ["-v", VOICES[g], "-o", path.join(dir, file), "--data-format=aac@22050", "--bit-rate=24000", text.replace(/^([ABC])\.$/, "$1")]);
  map[key] = file;
});
fs.writeFileSync(path.join(root, "data", "audio.js"), "// tools/make-audio.js が生成。手で編集しない\nconst AUDIO = " + JSON.stringify(map, null, 0) + ";\n");
console.log(`${clips.size} clips`);
