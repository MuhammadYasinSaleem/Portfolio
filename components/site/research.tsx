import { research as r } from "@/lib/content"
import { Reveal, SectionHeading, Tags } from "./ui"

const linkCls = "flex min-h-11 items-center text-accent hover:underline"

export default function Research() {
  const d = r.diagnosense
  const b = r.brain
  return (
    <section id="research" className="grid-band border-y border-line px-5 py-[72px] md:px-20 md:py-[120px]">
      <SectionHeading n="02" note="Medical-imaging deep learning · explainable by design">
        AI &amp; Research
      </SectionHeading>

      <Reveal>
        <article className="grid gap-8 border border-line2 bg-bg p-6 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-12 md:p-8">
          <div className="flex flex-col gap-5">
            <div className="font-mono text-xs uppercase tracking-wider text-accent">{d.kind}</div>
            <h3 className="font-display text-[40px] leading-none md:text-[56px]">{d.title}</h3>
            <p className="text-muted">{d.summary}</p>
            <Tags items={d.tags} />
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {d.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 border border-line">
              {d.metrics.map((m, i) => (
                <div key={m.l} className={`p-4 ${i ? "border-l border-line" : ""}`}>
                  <div className="font-mono text-[22px] text-accent md:text-[30px]">{m.v}</div>
                  <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">{m.l}</div>
                </div>
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.image} alt="DiagnoSense application screenshot" className="block h-auto w-full border border-line" />
          </div>
        </article>
      </Reveal>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Reveal className="flex">
          <article className="flex w-full flex-col gap-3 border border-line bg-bg p-6 md:p-8">
            <div className="font-mono text-xs uppercase tracking-wider text-accent">{b.kind}</div>
            <h3 className="font-display text-[30px] leading-none md:text-[40px]">
              {b.title} <span className="italic text-muted">{b.sub}</span>
            </h3>
            <p className="text-muted">{b.summary}</p>
            <Tags items={b.tags} className="mt-auto" />
            <a href={b.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
              GitHub ↗
            </a>
          </article>
        </Reveal>
        <Reveal className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.image} alt="Brain tumor classification app" className="block h-auto w-full border border-line bg-surface" />
        </Reveal>
      </div>

      <a
        href={r.text.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex flex-wrap items-center justify-between gap-4 border border-line bg-bg px-6 py-5 transition-colors hover:border-accent md:px-10"
      >
        <span>
          <span className="font-display text-[26px]">{r.text.title}</span>
          <span className="ml-4 text-muted">{r.text.sub}</span>
        </span>
        <span className="text-accent">View ↗</span>
      </a>
    </section>
  )
}
