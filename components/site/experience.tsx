import { timeline } from "@/lib/content"
import {Reveal, SectionHeading, Tags } from "./ui"
import { sectionPad } from "./styles"

export default function Experience() {
  return (
    <section id="experience" className={sectionPad}>
      <SectionHeading n="03">Experience &amp; Education</SectionHeading>
      <div className="flex max-w-[860px] flex-col">
        {timeline.map((t) => (
          <Reveal key={t.title + t.org}>
            <div className="grid gap-2 pb-10 md:grid-cols-[160px_1fr] md:gap-8">
              <div className="pt-2 font-mono text-xs uppercase tracking-wider text-muted">{t.kind}</div>
              <div className="relative border-l border-line2 pl-7">
                <span className="absolute -left-[6px] top-3 h-[11px] w-[11px] bg-accent" />
                <h3 className="font-display text-[30px] leading-[1.1] md:text-[40px]">{t.title}</h3>
                <div className="mb-2.5 mt-1.5 text-accent">{t.org}</div>
                <p className="mb-3.5 text-muted">{t.body}</p>
                <Tags items={t.tags} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
