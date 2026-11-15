"use client"

import { useEffect, useRef, type ReactNode } from "react"

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in")
          io.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

export function SectionHeading({ n, children, note }: { n: string; children: ReactNode; note?: string }) {
  return (
    <div className="mb-12 md:mb-12">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[13px] text-accent">{n}</span>
        <h2 className="font-display text-[40px] leading-none md:text-[64px]">{children}</h2>
      </div>
      {note && <p className="mt-3 font-mono text-[13px] text-muted">{note}</p>}
    </div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="border border-line px-2 py-[3px] font-mono text-xs text-muted">{children}</span>
}

export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  )
}

