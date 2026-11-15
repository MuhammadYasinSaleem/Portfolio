import { stack } from "@/lib/content"
import {Reveal, SectionHeading } from "./ui"
import { sectionPad } from "./styles"

export default function Stack() {
  return (
    <section id="stack" className={`${sectionPad} border-t border-line`}>
      <SectionHeading n="05">Stack</SectionHeading>
      <Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-5 md:gap-8">
          {stack.map((g) => (
            <div key={g.name} className="border-t border-line2 pt-4">
              <div className="mb-3.5 font-mono text-xs uppercase tracking-wider text-accent">{g.name}</div>
              <ul className="flex flex-col gap-1.5">
                {g.items.map((i) => (
                  <li key={i} className="text-[17px]">
                    {i}
                  </li>
                ))}
              </ul>
              {g.concepts && (
                <ul className="mt-3.5 flex flex-col gap-1.5 border-t border-dashed border-line pt-3.5">
                  {g.concepts.map((i) => (
                    <li key={i} className="font-display text-[19px] italic text-muted">
                      {i}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
