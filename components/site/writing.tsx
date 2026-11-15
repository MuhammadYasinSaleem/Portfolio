"use client"

import { useEffect, useState } from "react"
import { fallbackArticles, profile } from "@/lib/content"
import {Reveal, SectionHeading } from "./ui"
import { sectionPad } from "./styles"

type Article = { title: string; snippet: string; link: string; thumb?: string | null }

export default function Writing() {
  const [articles, setArticles] = useState<Article[]>(fallbackArticles)

  useEffect(() => {
    fetch("/api/medium")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) setArticles(data.slice(0, 3))
      })
      .catch(() => {})
  }, [])

  return (
    <section id="writing" className={`${sectionPad} border-t border-line`}>
      <SectionHeading n="04">Writing</SectionHeading>
      <div className="grid gap-5 md:grid-cols-3">
        {articles.map((a) => (
          <Reveal key={a.link} className="flex">
            <a href={a.link} target="_blank" rel="noopener noreferrer" className="flex w-full flex-col border border-line bg-surface transition-colors hover:border-accent md:min-h-[260px]">
              {a.thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.thumb} alt="" loading="lazy" className="aspect-video w-full border-b border-line object-cover" />
              ) : (
                <div className="stripes aspect-video border-b border-line" aria-hidden />
              )}
              <div className="flex flex-1 flex-col gap-3.5 px-7 pb-7 pt-6">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Medium</span>
                <h3 className="font-display text-2xl leading-[1.1] md:text-[28px]">{a.title}</h3>
                <p className="line-clamp-3 text-[15px] text-muted">{a.snippet}</p>
                <span className="mt-auto font-medium text-accent">Read on Medium ↗</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <a href={profile.medium} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center text-accent hover:underline">
        More on Medium →
      </a>
    </section>
  )
}
