import Link from "next/link"
import { work } from "@/lib/content"
import {Reveal, SectionHeading, Tags } from "./ui"
import { sectionPad } from "./styles"

export default function Work() {
  return (
    <section id="work" className={sectionPad}>
      <SectionHeading n="01">Selected Work</SectionHeading>
      <div className="grid gap-5 md:grid-cols-2">
        {work.map((w) => (
          <Reveal key={w.title} className="flex">
            <article className="flex w-full flex-col gap-5 border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent md:min-h-[520px] md:p-10">
              <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-muted">
                <span>{w.kind}</span>
                <span>{w.n}</span>
              </div>
              <h3 className="font-display text-[30px] leading-none md:text-[40px]">{w.title}</h3>
              <p className="text-muted">{w.summary}</p>
              <ul className="flex flex-col gap-2.5 border-t border-line pt-5 text-[15px]">
                {w.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="font-mono text-accent">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Tags items={w.tags} className="mt-auto" />
              {w.link.external ? (
                <a href={w.link.href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center font-medium text-accent hover:underline">
                  {w.link.label} ↗
                </a>
              ) : (
                <Link href={w.link.href} className="flex min-h-11 items-center font-medium text-accent hover:underline">
                  {w.link.label} →
                </Link>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
