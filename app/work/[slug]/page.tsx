import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Footer from "@/components/site/footer"
import Nav from "@/components/site/nav"
import { Tags } from "@/components/site/ui"
import { peoplance as p } from "@/lib/content"

export function generateStaticParams() {
  return [{ slug: "peoplance" }]
}

export const metadata: Metadata = {
  title: "Peoplance case study",
  description: p.summary,
}

const eyebrow = "font-mono text-xs uppercase tracking-wider text-accent"

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug !== "peoplance") notFound()

  return (
    <>
      <Nav home={false} />
      <main>
        <header className="px-5 pb-12 pt-12 md:px-20 md:pb-16 md:pt-24">
          <Link href="/#work" className="mb-8 inline-flex min-h-11 items-center font-mono text-[13px] text-muted hover:text-accent">
            ← Back to work
          </Link>
          <div className={eyebrow}>Case study · {p.kind}</div>
          <h1 className="mb-6 mt-4 font-display text-[60px] leading-[0.95] tracking-[-0.02em] md:text-[132px]">
            {p.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="max-w-[760px] text-lg md:text-xl">{p.summary}</p>
        </header>

        <section className="mx-5 border-y border-line md:mx-20">
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {p.facts.map((f, i) => (
              <div key={f.l} className={`flex flex-col border-line py-5 md:py-8 ${i % 2 ? "border-l pl-4" : ""} ${i ? "md:pl-7" : "md:pl-0"} ${i > 1 ? "border-t md:border-t-0" : ""} ${i ? "md:border-l" : ""}`}>
                <dt className="order-2 font-mono text-[11px] uppercase tracking-wider text-muted">{f.l}</dt>
                <dd className="font-mono text-[26px] text-accent md:text-[40px]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <p className="px-5 pt-4 font-mono text-xs text-muted md:px-20">{p.factNote}</p>

        <section className="px-5 py-[72px] md:px-20 md:py-[100px]">
          <h2 className="mb-10 font-display text-[40px] leading-none md:text-[64px]">Architecture</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {p.architecture.map((a) => (
              <div key={a.name} className="border border-line bg-surface p-6 md:p-8">
                <div className={eyebrow}>{a.name}</div>
                <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
                  {a.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-mono text-accent">→</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid-band border-y border-line px-5 py-[72px] md:px-20 md:py-[100px]">
          <h2 className="mb-10 font-display text-[40px] leading-none md:text-[64px]">Engineering highlights</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {p.highlights.map((h, i) => (
              <article key={h.title} className="border border-line2 bg-bg p-6 md:p-10">
                <div className="mb-3 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mb-3 font-display text-[28px] leading-[1.1] md:text-[34px]">{h.title}</h3>
                <p className="text-muted">{h.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 py-[72px] md:px-20 md:py-[100px]">
          <h2 className="mb-10 font-display text-[40px] leading-none md:text-[64px]">Modules</h2>
          <ul className="grid gap-x-8 sm:grid-cols-2 md:grid-cols-3">
            {p.modules.map((m, i) => (
              <li key={m} className="flex gap-4 border-t border-line2 py-4">
                <span className="font-mono text-[13px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg">{m}</span>
              </li>
            ))}
          </ul>
          <Tags items={p.stackTags} className="mt-10" />
          <Link href="/#contact" className="mt-12 inline-flex min-h-12 items-center bg-accent px-6 font-semibold text-on-accent hover:bg-accent-hi">
            Talk to me about it
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
