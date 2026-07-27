import nodemailer from "nodemailer";
import { getClientIp, geoLookup, parseUA } from "@/lib/enrich";
import { NextRequest, NextResponse } from "next/server";

const NOTIFY_EVENTS = new Set(["cv_download", "contact"]);

function mailer() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { page, event, fingerprint, referrer } = payload || {};

    const ip = getClientIp(req);
    const [geo, ua] = [await geoLookup(ip), parseUA(req.headers.get("user-agent"))];

    const row = {
      page: page || null,
      event: event || "pageview",
      referrer: referrer || req.headers.get("referer") || null,
      ip,
      fingerprint: fingerprint || null,
      ...geo,
      ...ua,
      user_agent: req.headers.get("user-agent") || null,
    };

    // Email only for high-signal events.
    if (NOTIFY_EVENTS.has(row.event)) {
      const t = mailer();
      if (t) {
        const when = new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" });
        const visitorTime = geo.timezone
          ? new Date().toLocaleString("en-GB", { timeZone: geo.timezone, hour12: false })
          : null;
        const mapsLink =
          geo.lat && geo.lon
            ? `<a href="https://www.google.com/maps?q=${geo.lat},${geo.lon}" target="_blank">${geo.lat.toFixed(4)}, ${geo.lon.toFixed(4)}</a>`
            : null;
        const locationLine = [geo.city, geo.region, geo.country].filter(Boolean).join(", ");
        try {
          await t.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.NOTIFY_EMAIL || process.env.GMAIL_USER,
            subject: `${row.event === "cv_download" ? "📄 CV downloaded" : "✉️ Contact"} — ${geo.city || "?"}, ${geo.country || "?"}`,
            html: `
              <h2>${row.event === "cv_download" ? "CV Download" : "Contact"}</h2>
              <table cellpadding="4">
                <tr><td><b>Event</b></td><td>${row.event}</td></tr>
                <tr><td><b>Location</b></td><td>${locationLine || "Unknown"}${geo.postal ? ` (${geo.postal})` : ""}</td></tr>
                ${mapsLink ? `<tr><td><b>Coordinates</b></td><td>${mapsLink}</td></tr>` : ""}
                <tr><td><b>Timezone</b></td><td>${geo.timezone || "Unknown"}${visitorTime ? ` — ${visitorTime}` : ""}</td></tr>
                <tr><td><b>Company/ISP</b></td><td>${geo.org || "Unknown"}</td></tr>
                <tr><td><b>Referrer</b></td><td>${row.referrer || "Direct"}</td></tr>
                <tr><td><b>Browser</b></td><td>${ua.browser || "?"} / ${ua.os || "?"} (${ua.device})</td></tr>
                <tr><td><b>Time (PKT)</b></td><td>${when}</td></tr>
              </table>`,
          });
        } catch (e) {
          console.error("[mail] send failed:", e instanceof Error ? e.message : String(e));
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[track] error:", e instanceof Error ? e.message : String(e));
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
