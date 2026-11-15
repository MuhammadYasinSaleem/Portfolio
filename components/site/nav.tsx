"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, Moon, Sun, X } from "@/components/icons"
import { nav, profile } from "@/lib/content"
import { trackEvent } from "@/lib/track"
import Logo from "./logo"

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  useEffect(() => {
    const read = () =>
      setTheme(
        (document.documentElement.dataset.theme as "light" | "dark") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
      )
    read()
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener("change", read)
    return () => mq.removeEventListener("change", read)
  }, [])
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch {}
    setTheme(next)
  }
  return (
    <button
      type="button"
      onClick={flip}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="flex h-11 w-11 items-center justify-center border border-line2 text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default function Nav({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false)
  const base = home ? "" : "/"
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="flex items-center justify-between px-5 py-1 md:px-20 md:py-2.5">
        <Link href="/" aria-label="Muhammad Yasin, home" className="flex min-h-11 items-center">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={base + n.href} className="border-b border-transparent py-2 text-[15px] text-muted transition-colors hover:border-accent hover:text-ink">
              {n.label}
            </a>
          ))}
          <a
            href={profile.cv}
            download="Muhammad_Yasin_CV.pdf"
            onClick={() => trackEvent("cv_download", "cv_download")}
            className="flex min-h-11 items-center border border-line2 px-4 font-mono text-[13px] transition-colors hover:border-accent hover:text-accent"
          >
            Download CV ↓
          </a>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center border border-line2"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="flex flex-col border-t border-line bg-bg px-5 pb-4 md:hidden">
          {nav.map((n) => (
            <a key={n.href} href={base + n.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line text-lg">
              {n.label}
            </a>
          ))}
          <a href={profile.cv} download="Muhammad_Yasin_CV.pdf" onClick={() => trackEvent("cv_download", "cv_download")} className="flex min-h-12 items-center font-mono text-sm text-accent">
            Download CV ↓
          </a>
        </div>
      )}
    </nav>
  )
}
