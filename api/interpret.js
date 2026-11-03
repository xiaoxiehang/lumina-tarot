// Vercel serverless: AI interpretations via JJJ transit (EN/ZH)
// Types: tarot, horoscope, match, dream, natal
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { type, cards, question, sign, signA, signB, dream, birth, lang } = req.body || {};
  const zh = lang === "zh";
  const JJJ_KEY = process.env.JJJ_API_KEY;
  const JJJ_BASE = process.env.JJJ_BASE_URL || "http://43.98.190.8";
  const JJJ_MODEL = process.env.JJJ_MODEL || "gpt-6.1-sol";

  if (!JJJ_KEY) return res.status(500).json({ error: "AI service not configured" });

  let prompt = "";
  if (type === "tarot") {
    const cardLines = (cards || []).map((c, i) => {
      const nm = zh ? c.zh : c.en;
      const meaning = c.reversed ? c.rev : c.up;
      return `${i + 1}. [${c.position}] ${nm} (${c.reversed ? (zh ? "逆位" : "Reversed") : (zh ? "正位" : "Upright")}) — ${meaning}`;
    }).join("\n");
    prompt = zh
      ? `你是一位经验丰富的塔罗占卜师，语气温暖神秘但不装神弄鬼。\n\n求问者的问题：${question || "（随缘一问）"}\n\n牌面：\n${cardLines}\n\n请解读：1.先一句话点出核心信息 2.逐张牌结合位置解读，每张2-3句 3.综合给出整体趋势 4.最后一条具体可执行的建议。300-450字中文，不用"不是…而是…"句式，不喊口号。`
      : `You are an experienced tarot reader — warm, mystical, never cheesy.\n\nQuestion: ${question || "(open reading)"}\n\nCards:\n${cardLines}\n\nGive a reading: 1. Open with one striking core message 2. Interpret each card in its position, 2-3 sentences each 3. Synthesize an overall trend 4. End with one concrete actionable suggestion. 300-450 words, English. No slogans.`;
  } else if (type === "horoscope") {
    const today = new Date().toISOString().slice(0, 10);
    prompt = zh
      ? `你是占星师。为${sign}写今日运势（${today}）：整体（1-5星+一句话）、爱情、事业、财运、健康各一句话，幸运色、幸运数字，宜、忌各一条。亲切自然，200字中文。`
      : `You are an astrologer. Today's horoscope for ${sign} (${today}): overall (1-5 stars + one line), love, career, money, health (one line each), lucky color, lucky number, one do and one don't. Warm, ~200 words, English.`;
  } else if (type === "match") {
    prompt = zh
      ? `你是占星合盘师。分析${signA}与${signB}的配对：契合度打分（0-100）、三个最合的维度、两个需要注意的摩擦点、一条相处建议。语气像朋友聊天，真诚不油腻，250字中文。`
      : `You are a synastry astrologer. Analyze the match between ${signA} and ${signB}: compatibility score (0-100), three strongest dimensions, two friction points to watch, one piece of relating advice. Like a wise friend talking, 250 words, English.`;
  } else if (type === "dream") {
    prompt = zh
      ? `你是解梦师。求梦者描述：${dream}\n\n请解析：1. 梦中3个关键象征及含义 2. 可能对应的现实情绪或处境 3. 一条温和的建议。像深夜电台主持人一样娓娓道来，300字中文，不说教。`
      : `You are a dream interpreter. The dream: ${dream}\n\nInterpret: 1. Three key symbols and their meanings 2. The likely real-life emotion or situation behind it 3. One gentle suggestion. Like a late-night radio host, 300 words, English, never preachy.`;
  } else if (type === "natal") {
    const { date, time, place } = birth || {};
    prompt = zh
      ? `你是占星师。出生信息：${date} ${time || ""} ${place || ""}。请给出：太阳星座、月亮星座、上升星座的推断（注明为近似），每个配2-3句性格解读，再加一段整体命盘气质总结。400字中文，温暖真诚。`
      : `You are an astrologer. Birth info: ${date} ${time || ""} ${place || ""}. Give: likely Sun, Moon and Rising signs (note as approximate), 2-3 sentences each on personality, plus an overall chart temperament summary. 400 words, English, warm and sincere.`;
  } else if (type === "oracle") {
    const { card, question } = req.body;
    const nm = zh ? card.zh : card.en;
    prompt = zh
      ? `你是神谕。求问者问：${question || "（心中默念的问题）"}\n抽到的牌：${nm}（${card.reversed ? "逆位" : "正位"}，${card.reversed ? card.rev : card.up}）\n\n请先给出 verdict：yes/no/maybe 三选一（JSON 格式 {"verdict":"yes","text":"..."}）。text 是 80-120 字的中文解读，直接、有力、不模棱两可，像神谕一样笃定。`
      : `You are an oracle. Question: ${question || "(unspoken)"}\nCard drawn: ${nm} (${card.reversed ? "Reversed" : "Upright"}, ${card.reversed ? card.rev : card.up})\n\nReply in JSON: {"verdict":"yes|no|maybe","text":"..."}. Text: 80-120 words English, direct and decisive like an oracle, no hedging.`;
  } else {
    return res.status(400).json({ error: "unknown type" });
  }

  try {
    const r = await fetch(`${JJJ_BASE}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${JJJ_KEY}` },
      body: JSON.stringify({ model: JJJ_MODEL, messages: [{ role: "user", content: prompt }], temperature: 0.85, max_tokens: 1400 }),
    });
    const d = await r.json();
    let text = d.choices?.[0]?.message?.content || "";
    let verdict = null;
    if (type === "oracle" && text) {
      try {
        const j = JSON.parse(text.replace(/^```json?\n?/, "").replace(/\n?```$/, "").trim());
        verdict = j.verdict; text = j.text || text;
      } catch (e) { /* fall through with raw text */ }
    }
    if (!text) return res.status(500).json({ error: "empty AI response" });
    return res.status(200).json({ success: true, text, ...(verdict ? { verdict } : {}) });
  } catch (e) {
    return res.status(500).json({ error: String(e).slice(0, 200) });
  }
}
