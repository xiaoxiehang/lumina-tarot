// Generate SEO landing pages: 78 cards + 12 signs (EN)
const fs = require("fs"), path = require("path");
const dataPath = path.join(__dirname, "..", "public", "tarot-data.js");
let src = fs.readFileSync(dataPath, "utf8");
src = src.replace(/const FULL_DECK[\s\S]*$/, "");
const getData = new Function(src + "; return { MAJOR_ARCANA, MINOR_ARCANA, ZODIAC };");
const { MAJOR_ARCANA, MINOR_ARCANA } = getData();
const FULL_DECK = [...MAJOR_ARCANA, ...MINOR_ARCANA];

const OUT = path.join(__dirname, "..", "public");
function page(title, desc, body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} | Lumina Tarot</title>
<meta name="description" content="${desc}">
<style>body{background:#0c0a1a;color:#f2ecdd;font-family:Georgia,serif;max-width:720px;margin:0 auto;padding:40px 24px;line-height:1.8}
h1{color:#c9a86a;font-size:34px}a{color:#c9a86a}.tag{display:inline-block;border:1px solid #c9a86a55;border-radius:20px;padding:2px 12px;font-size:12px;color:#9a94b8;margin-right:8px}
.cta{display:block;text-align:center;margin:36px 0;padding:16px;border:1px solid #c9a86a;border-radius:12px;text-decoration:none;font-size:17px}
footer{margin-top:48px;color:#6b6688;font-size:12px;text-align:center}</style></head>
<body>${body}<a class="cta" href="/">✦ Get a free AI reading on Lumina Tarot</a>
<footer>Lumina Tarot · for reflection & entertainment</footer></body></html>`;
}
let n = 0;
for (const c of FULL_DECK) {
  const arcana = c.n < 22 ? "major" : "minor";
  const suit = c.suit || "";
  const slug = c.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const dir = path.join(OUT, "card", slug); fs.mkdirSync(dir, { recursive: true });
  const kw = (c.kw || []).join(", ");
  const body = `<p><a href="/">← Lumina Tarot</a></p><h1>${c.en} — Tarot Card Meaning</h1>
<p><span class="tag">${arcana === "major" ? "Major Arcana" : suit + " · Minor Arcana"}</span>${kw ? `<span class="tag">${kw}</span>` : ""}</p>
<h2>Upright</h2><p>${c.up}</p><h2>Reversed</h2><p>${c.rev}</p>
<p>Drawn in a reading, the <b>${c.en}</b> ${arcana === "major" ? "marks a major life theme" : "speaks to everyday energy"}. Ask the AI for a personalized interpretation of this card in your situation.</p>`;
  fs.writeFileSync(path.join(dir, "index.html"), page(`${c.en} Meaning`, `${c.en} tarot meaning: upright & reversed. ${c.up}`, body));
  n++;
}
const ZOD = [
  ["aries","Aries"],["taurus","Taurus"],["gemini","Gemini"],["cancer","Cancer"],["leo","Leo"],["virgo","Virgo"],
  ["libra","Libra"],["scorpio","Scorpio"],["sagittarius","Sagittarius"],["capricorn","Capricorn"],["aquarius","Aquarius"],["pisces","Pisces"],
];
for (const [slug, name] of ZOD) {
  const dir = path.join(OUT, "horoscope", slug); fs.mkdirSync(dir, { recursive: true });
  const body = `<p><a href="/">← Lumina Tarot</a></p><h1>${name} — Daily Horoscope</h1>
<p>Get your free daily ${name} horoscope with AI interpretation — love, career, money and health, refreshed every morning.</p>
<p>Tap through for today's stars, compatibility checks, and tarot readings tailored to ${name} energy.</p>`;
  fs.writeFileSync(path.join(dir, "index.html"), page(`${name} Daily Horoscope`, `Free daily ${name} horoscope: love, career, money, health. AI-powered, updated every morning.`, body));
  n++;
}
console.log("SEO pages generated:", n);
