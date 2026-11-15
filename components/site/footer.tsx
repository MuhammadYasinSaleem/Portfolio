export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-2 border-t border-line px-5 py-7 font-mono text-xs text-muted md:px-20">
      <span>© {new Date().getFullYear()} Muhammad Yasin</span>
      <span>Built with Next.js · Tailwind</span>
    </footer>
  )
}
