import type { SVGProps } from "react"

/**
 * MY monogram: the inner V of the "M" doubles as the arms of the "Y",
 * and the accent stem drops from that shared vertex to the baseline.
 */
export function LogoMark({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" strokeWidth="6" strokeLinejoin="miter" strokeLinecap="butt" className={className} aria-hidden {...rest}>
      <path d="M13 44V10l19 23 19-23v34" stroke="currentColor" />
      <path d="M32 33v25" stroke="var(--accent)" />
    </svg>
  )
}

export default function Logo({ withName = true }: { withName?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="h-8 w-8 text-ink" />
      {withName && <span className="hidden font-display text-[24px] leading-none sm:block tracking-[-0.01em]">Muhammad Yasin</span>}
    </span>
  )
}
