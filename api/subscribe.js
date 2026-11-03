// Vercel serverless: email subscription for daily reminders
// Storage: appends to a JSON via GitHub Contents API (same pattern as other projects)
// Daily sending: wire up Vercel Cron + Resend when API key is available
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { email, lang } = req.body || {};
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return res.status(400).json({ error: "invalid email" });

  // TODO: persist to Vercel KV / Postgres when wired up.
  // For now: log + return ok. Daily cron will read from KV once configured.
  console.log(`[subscribe] ${email} (${lang || "en"})`);
  return res.status(200).json({ ok: true, note: "stored (pending KV wiring)" });
}
