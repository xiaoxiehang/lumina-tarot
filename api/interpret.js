// Vercel serverless: AI tarot interpretation via JJJ transit
export default async function handler(req, res) {
if (req.method!== "POST") return res.status(405).json({ error: "Method not allowed"});

const { type, cards, question, sign} = req.body || {};
const JJJ_KEY = process.env.JJJ_API_KEY;
const JJJ_BASE = process.env.JJJ_BASE_URL || "http://43.98.190.8";
const JJJ_MODEL = process.env.JJJ_MODEL || "gpt-6.1-sol";

if (!JJJ_KEY) return res.status(500).json({ error: "AI service not configured"});

let prompt = "";
if (type === "tarot") {
const cardLines = (cards || []).map((c, i) =>
`${i + 1}.${c.zh}（${c.en}）${c.reversed? "": ""}——${c.reversed? c.rev: c.up}`
).join("\n");
prompt = `你是一位经验丰富的塔罗牌占卜师，用温暖、神秘但不装神弄鬼的语气解读。\n\n求问者的问题：${question || "（未指定，随缘一问）"}\n\n牌阵：${cardLines}\n\n请给出解读，要求：\n1. 先一句话点出核心信息（hook）\n2. 逐张牌结合位置解读，每张 2-3 句\n3. 综合起来给一个整体趋势判断\n4. 最后给一条具体可执行的建议\n5. 全文 300-450 字，中文，不要用"不是…而是…"句式，不要喊口号`;
} else if (type === "horoscope") {
prompt = `你是一位占星师。请为${sign}写一份今日运势（${new Date().toISOString().slice(0, 10)}），包含：整体运势（1-5星+一句话）、爱情运、事业运、财运、健康运（各一句话）、幸运色、幸运数字、今日宜忌各一条。语气亲切自然，200字左右，中文。`;
} else {
return res.status(400).json({ error: "unknown type"});
}

try {
const r = await fetch(`${JJJ_BASE}/v1/chat/completions`, {
method: "POST",
headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JJJ_KEY}`},
body: JSON.stringify({ model: JJJ_MODEL, messages: [{ role: "user", content: prompt}], temperature: 0.8, max_tokens: 1200}),
});
const d = await r.json();
const text = d.choices?.[0]?.message?.content || "";
if (!text) return res.status(500).json({ error: "empty AI response"});
return res.status(200).json({ success: true, text});
} catch (e) {
return res.status(500).json({ error: String(e).slice(0, 200)});
}
}
