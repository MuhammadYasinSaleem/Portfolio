import nodemailer from "nodemailer";
import { getClientIp, geoLookup, parseUA } from "@/lib/enrich";
import { NextRequest, NextResponse } from "next/server";

function mailer() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
}

function escapeHtml(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const name = String(payload?.name || "").trim();
    const email = String(payload?.email || "").trim();
    const subject = String(payload?.subject || "").trim();
    const message = String(payload?.message || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    }
    if (message.length > 5000 || subject.length > 200 || name.length > 100) {
      return NextResponse.json({ ok: false, error: "Input too long." }, { status: 400 });
    }

    const t = mailer();
    if (!t) {
      console.error("[contact] mail not configured: GMAIL_USER/GMAIL_APP_PASSWORD missing");
      return NextResponse.json({ ok: false, error: "Email is not configured." }, { status: 500 });
    }

    const ip = getClientIp(req);
    const [geo, ua] = [await geoLookup(ip), parseUA(req.headers.get("user-agent"))];
    const when = new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" });
    const locationLine = [geo.city, geo.region, geo.country].filter(Boolean).join(", ");

    await t.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFY_EMAIL || process.env.GMAIL_USER,
      replyTo: `${name} <${email}>`,
      subject: `✉️ Portfolio contact: ${subject}`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}\n\n---\nLocation: ${locationLine || "Unknown"}\nBrowser: ${ua.browser || "?"} / ${ua.os || "?"}\nTime (PKT): ${when}`,
      html: `
        <h2>New message from your portfolio</h2>
        <table cellpadding="4">
          <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td><b>Subject</b></td><td>${escapeHtml(subject)}</td></tr>
          <tr><td><b>Location</b></td><td>${escapeHtml(locationLine || "Unknown")}</td></tr>
          <tr><td><b>Browser</b></td><td>${escapeHtml(`${ua.browser || "?"} / ${ua.os || "?"} (${ua.device})`)}</td></tr>
          <tr><td><b>Time (PKT)</b></td><td>${when}</td></tr>
        </table>
        <h3>Message</h3>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] error:", e instanceof Error ? e.message : String(e));
    return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 500 });
  }
}
