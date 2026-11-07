/* Lead endpoint for the "Book a free meeting" form.
   It validates the request, filters spam, and emails the lead to the team using Resend.
   Until RESEND_API_KEY is set in Vercel, it answers 503 and the page falls back to FormSubmit,
   so nothing breaks while it is not configured.
   Environment variables (Vercel > Settings > Environment Variables):
     RESEND_API_KEY   required, from resend.com
     LEAD_TO          optional, where leads are sent (default contact.gen1solutions@gmail.com)
     LEAD_FROM        optional, sender such as "Gen1 Solutions <hello@gen1sol.com>" (needs a verified domain in Resend)
     LEAD_AUTOREPLY   optional, set to 1 to also send the lead a confirmation email (needs LEAD_FROM on a verified domain) */

var ALLOWED = ["https://www.gen1sol.com", "https://gen1sol.com"];
var hits = new Map(); /* best-effort per-IP rate limit, kept per server instance */

function clean(v, max) {
  return String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
}
function send(res, code, obj) { res.status(code).json(obj); }

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return send(res, 405, { success: false, message: "POST only" }); }

  var origin = req.headers.origin || "";
  if (ALLOWED.indexOf(origin) === -1 && !/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return send(res, 403, { success: false, message: "Not allowed" });

  var key = process.env.RESEND_API_KEY;
  if (!key) return send(res, 503, { success: false, message: "Email service not configured" });

  var ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  var now = Date.now(), list = (hits.get(ip) || []).filter(function (t) { return now - t < 10 * 60 * 1000; });
  if (list.length >= 5) return send(res, 429, { success: false, message: "Too many requests. Please try again in a few minutes." });
  list.push(now); hits.set(ip, list);

  var b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { return send(res, 400, { success: false, message: "Bad request" }); } }
  if (!b || typeof b !== "object") return send(res, 400, { success: false, message: "Bad request" });

  if (b._honey) return send(res, 200, { success: true }); /* bots: look successful, send nothing */

  var d = {
    name: clean(b.name, 120), organisation: clean(b.organisation, 160), email: clean(b.email, 160), whatsapp: clean(b.whatsapp, 40),
    services: clean(b.services, 300), preferred_day: clean(b.preferred_day, 20), preferred_time: clean(b.preferred_time, 40),
    message: clean(b.message, 4000), page: clean(b.page, 300), referrer: clean(b.referrer, 300),
    utm: ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].map(function (k) { return b[k] ? k + "=" + clean(b[k], 80) : ""; }).filter(Boolean).join(", ")
  };
  if (!d.name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) || d.message.length < 5) return send(res, 400, { success: false, message: "Please add your name, a valid email and a few words about your project." });
  if (d.whatsapp && !/^[+()\d\s-]{7,20}$/.test(d.whatsapp)) return send(res, 400, { success: false, message: "Please check your WhatsApp number." });

  var rows = [["Name", d.name], ["Organisation", d.organisation], ["Email", d.email], ["WhatsApp", d.whatsapp], ["Needs", d.services], ["Preferred day", d.preferred_day], ["Preferred time", d.preferred_time], ["Message", d.message], ["Page", d.page], ["Came from", d.referrer], ["Campaign", d.utm]].filter(function (r) { return r[1]; });
  var html = '<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">' + rows.map(function (r) { return '<tr><td style="border:1px solid #e5e5e5;background:#fafafa"><b>' + esc(r[0]) + '</b></td><td style="border:1px solid #e5e5e5;white-space:pre-wrap">' + esc(r[1]) + '</td></tr>'; }).join("") + "</table>";
  var text = rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n");
  var from = process.env.LEAD_FROM || "Gen1 Solutions <onboarding@resend.dev>";

  async function mail(payload) {
    var r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!r.ok) throw new Error("Resend " + r.status);
  }
  try {
    await mail({ from: from, to: [process.env.LEAD_TO || "contact.gen1solutions@gmail.com"], reply_to: d.email, subject: "New meeting request: " + d.name + (d.organisation ? " (" + d.organisation + ")" : ""), html: html, text: text });
    if (process.env.LEAD_AUTOREPLY === "1") {
      try { await mail({ from: from, to: [d.email], subject: "We have your request, " + d.name.split(" ")[0], text: "Assalamu alaikum " + d.name.split(" ")[0] + ",\n\nThank you for contacting Gen1 Solutions. We have your request and will confirm a time on WhatsApp or email, usually the same day.\n\nGen1 Solutions\nwww.gen1sol.com" }); } catch (e) { /* the lead is already delivered, so ignore auto-reply errors */ }
    }
    return send(res, 200, { success: true });
  } catch (e) {
    return send(res, 502, { success: false, message: "Could not send right now" });
  }
};
