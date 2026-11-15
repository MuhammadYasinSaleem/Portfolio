import { Github, Linkedin, Mail } from "@/components/icons"
import { profile, stats } from "@/lib/content"
import { Reveal } from "./ui"

const iconBtn =
  "flex h-12 w-12 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"

export default function Hero() {
  return (
    <header>
      <div className="grid items-center gap-8 px-5 py-12 md:grid-cols-[1fr_auto] md:gap-16 md:px-20 md:py-12">
        <div>
          <div className="inline-flex items-center gap-2.5 border border-line2 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none" aria-hidden>
              <path d="m10.68 5.499-.996 4.982a.65.65 0 01-1.131.295L5.885 7.663" />
              <path d="m13.32 5.5.995 4.98a.65.65 0 001.131.296l2.668-3.113" />
              <path d="M20.428 8.952 17.5 18" />
              <path d="M4 20a2 2 0 012-2h12a2 2 0 012 2v1a1 1 0 01-1 1H5a1 1 0 01-1-1z" />
              <path d="M6.5 18 3.571 8.952" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="7" r="2" />
              <circle cx="4" cy="7" r="2" />
            </svg>
            <span>{profile.badge}</span>
          </div>
          <h1 className="mb-4 mt-6 font-display text-[60px] leading-[0.95] tracking-[-0.02em] md:text-[length:clamp(64px,min(8.5vw,14dvh),132px)]">
            Muhammad
            <br />
            Yasin<span className="text-accent">.</span>
          </h1>
          <div className="font-mono text-sm md:text-base">{profile.title}</div>
          <p className="mt-4 font-display text-[26px] italic leading-tight text-muted md:text-[clamp(24px,4dvh,34px)]">{profile.tagline}</p>
          <p className="mb-7 mt-5 max-w-[640px] text-lg md:text-xl">{profile.intro}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#contact" className="flex min-h-12 items-center bg-accent px-6 font-semibold text-on-accent transition-colors hover:bg-accent-hi active:translate-y-px">
              Contact Me
            </a>
            <a href={profile.cv} download="Muhammad_Yasin_CV.pdf" className="flex min-h-12 items-center border border-line2 px-6 transition-colors hover:border-accent hover:text-accent">
              Download CV
            </a>
            <div className="flex gap-2 md:ml-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconBtn}>
                <Github size={20} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconBtn}>
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className={iconBtn}>
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-2xl border border-line2 bg-surface md:h-[min(calc(100dvh-10rem),560px)] md:w-auto md:max-w-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/yasin.png" alt="Portrait of Muhammad Yasin" className="block h-full w-full object-cover object-[50%_20%]" />
        </div>
      </div>
      <Reveal>
        <dl className="mx-5 grid grid-cols-2 border-y border-line md:mx-20 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.l} className={`flex flex-col py-5 md:py-8 ${i % 2 ? "border-l pl-4" : ""} ${i ? "md:pl-7" : "md:pl-0"} ${i > 1 ? "border-t md:border-t-0" : ""} ${i ? "md:border-l" : ""} border-line`}>
              <dt className="order-2 font-mono text-[11px] uppercase tracking-wider text-muted">{s.l}</dt>
              <dd className="font-mono text-[26px] text-accent md:text-[40px]">{s.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </header>
  )
}
