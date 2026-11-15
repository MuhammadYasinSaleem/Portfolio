import type React from "react"
import "@/app/globals.css"
import type { Metadata, Viewport } from "next"
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google"

const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" })
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

const description =
  "Muhammad Yasin: Software Engineer and AI/ML Researcher. Building scalable software and exploring practical AI, from production SaaS platforms to medical-imaging deep learning."

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadyasin.vercel.app"),
  title: { default: "Muhammad Yasin | Software Engineer · AI/ML Researcher", template: "%s | Muhammad Yasin" },
  description,
  openGraph: {
    title: "Muhammad Yasin | Software Engineer · AI/ML Researcher",
    description,
    type: "website",
    images: ["/yasin.png"],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0d0e" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f2" },
  ],
}

// Applies a saved manual theme before paint; otherwise the OS preference (CSS media query) decides.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;document.documentElement.classList.add("js")}catch(e){document.documentElement.classList.add("js")}`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${instrument.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
