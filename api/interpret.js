// Vercel serverless: AI tarot interpretation via JJJ transit (EN/ZH)
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { type, cards, question, sign, lang } = req.body || {};
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
      ? `你是一位经验丰富的塔罗占卜师，语气温暖神秘但不装神弄鬼。\n\n求问者的问题：${question || "（随缘一问）"}\n\n牌面：\n${cardLines}\n\n请解读：\n1. 先一句话点出核心信息\n2. 逐张牌结合位置解读，每张2-3句\n3. 综合给出整体趋势判断\n4. 最后一条具体可执行的建议\n5. 300-450字中文，不用"不是…而是…"句式，不喊口号`
      : `You are an experienced tarot reader — warm, mystical, never cheesy.\n\nQuestion: ${question || "(open reading)"}\n\nCards:\n${cardLines}\n\nGive a reading:\n1. Open with one striking core message\n2. Interpret each card in its position, 2-3 sentences each\n3. Synthesize into an overall trend\n4. End with one concrete, actionable suggestion\n5. 300-450 words, English. No slogans, no "it's not X, it's Y" constructions.`;
  } else if (type === "horoscope") {
    const today = new Date().toISOString().slice(0, 10);
    prompt = zh
      ? `你是占星师。为${sign}写今日运势（${today}）：整体运势（1-5星+一句话）、爱情、事业、财运、健康各一句话，幸运色、幸运数字，宜、忌各一条。亲切自然，200字左右中文。`
      : `You are an astrologer. Write today's horoscope for ${sign} (${today}): overall (1-5 stars + one line), love, career, money, health (one line each), lucky color, lucky number, one do and one don't. Warm and natural, ~200 words, English.`;
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
    const text = d.choices?.[0]?.message?.content || "";
    if (!text) return res.status(500).json({ error: "empty AI response" });
    return res.status(200).json({ success: true, text });
  } catch (e) {
    return res.status(500).json({ error: String(e).slice(0, 200) });
  }
}
