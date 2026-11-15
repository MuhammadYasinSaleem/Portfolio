"use client"

import { useState, type FormEvent } from "react"
import { contactLinks } from "@/lib/content"
import { } from "./ui"
import { sectionPad } from "./styles"

const label = "flex flex-col gap-1.5 font-mono text-xs uppercase tracking-wider text-muted"
const field =
  "border border-line2 bg-bg px-3.5 font-sans text-base normal-case tracking-normal text-ink outline-none focus:border-accent focus:outline-2 focus:outline-accent"

export default function Contact() {
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "ok" | "error"; msg?: string }>({ kind: "idle" })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "")
    setStatus({ kind: "sending" })
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: data.get("email"),
          subject: `Portfolio message from ${name}`.slice(0, 200),
          message: data.get("message"),
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send message.")
      form.reset()
      setStatus({ kind: "ok", msg: "Message sent. I'll get back to you soon." })
    } catch (err) {
      setStatus({ kind: "error", msg: err instanceof Error ? err.message : "Something went wrong. Please email me directly." })
    }
  }

  return (
    <section id="contact" className={`${sectionPad} border-t border-line bg-surface`}>
      <h2 className="mb-14 font-display text-[56px] leading-[0.95] tracking-[-0.02em] md:text-[112px]">
        Let&apos;s build
        <br />
        <span className="italic text-accent">something.</span>
      </h2>
      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className={label}>
            Name
            <input name="name" type="text" required maxLength={100} autoComplete="name" className={`${field} min-h-12`} />
          </label>
          <label className={label}>
            Email
            <input name="email" type="email" required autoComplete="email" className={`${field} min-h-12`} />
          </label>
          <label className={label}>
            Message
            <textarea name="message" required rows={5} maxLength={5000} className={`${field} resize-y py-3`} />
          </label>
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="min-h-12 self-start bg-accent px-7 text-base font-semibold text-on-accent transition-colors hover:bg-accent-hi active:translate-y-px disabled:opacity-60"
          >
            {status.kind === "sending" ? "Sending…" : "Send message"}
          </button>
          <p role="status" className={`min-h-6 text-sm ${status.kind === "error" ? "text-[#d9534f]" : "text-accent"}`}>
            {status.msg}
          </p>
        </form>
        <div className="flex flex-col border-b border-line2">
          {contactLinks.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex min-h-16 items-center justify-between border-t border-line2 text-lg transition-colors hover:text-accent"
            >
              <span>{l.name}</span>
              <span className="font-mono text-[13px] text-muted">{l.sub} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
