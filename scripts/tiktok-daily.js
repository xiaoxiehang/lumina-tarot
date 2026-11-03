// TikTok content pipeline: generates daily video scripts (EN) for Lumina Tarot
// Usage: node scripts/tiktok-daily.js [--date YYYY-MM-DD]
// Output: prints 3 video scripts (daily card, horoscope highlight, oracle teaser)
const ZOD = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const HOOKS = [
  "POV: the universe has a message for you today",
  "Stop scrolling. This card chose YOU",
  "Your sign needed to hear this today",
  "The cards never lie — watch till the end",
  "If this found you, it's not a coincidence",
];
const CTAS = [
  "Get your free AI reading — link in bio",
  "Comment your sign for tomorrow's reading",
  "Save this for when you need it",
];

function pick(arr, seed) { return arr[seed % arr.length]; }
function main() {
  const dstr = process.argv[2] === "--date" ? process.argv[3] : null;
  const d = dstr ? new Date(dstr) : new Date();
  const seed = Math.floor(d.getTime() / 864e5);
  const date = d.toISOString().slice(0, 10);
  const sign = pick(ZOD, seed);
  const hook = pick(HOOKS, seed + 1);

  console.log(`# Lumina Tarot — TikTok scripts for ${date}\n`);

  console.log(`## 1. Daily Card (15s)\nHook: "${hook}"\nScript:\n"[Show card back, flip] Today's card is calling...\n[Beat] Trust what comes next.\nYour free AI tarot reading is waiting — link in bio."\nVisual: card flip close-up, starry background, text overlay of card name\nHashtags: #tarot #dailytarot #tarotreading #spiritualtiktok #fyp\n`);

  console.log(`## 2. Horoscope Spotlight: ${sign} (20s)\nHook: "${sign} — the stars are LOUD today"\nScript:\n"${sign}, listen up.\nToday the moon favors bold moves — say the thing you've been holding back.\nLucky color: gold. Lucky number: ${seed % 9 + 1}.\nFull reading for all 12 signs — link in bio."\nVisual: zodiac symbol animation, gold accents\nHashtags: #${sign.toLowerCase()} #horoscope #zodiac #astrologytiktok #fyp\n`);

  console.log(`## 3. Oracle Teaser (10s)\nHook: "Think of a yes-or-no question"\nScript:\n"Got a yes-or-no question? Think it now.\n[Pause 3s] The oracle says... [reveal YES/NO]\nWas it right? Try yours free — link in bio."\nVisual: dramatic pause, verdict reveal with sound effect\nHashtags: #yesorno #oracle #tarot #divination #fyp\n`);
}
main();
