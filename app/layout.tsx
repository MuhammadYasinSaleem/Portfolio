import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Muhammad Yasin | Full Stack Developer",
  description:
    "Portfolio website of Muhammad Yasin, a full stack developer specializing in React, Node.js, and modern web technologies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={inter.className}>
        {children}
      </body>
    </html>
  )
}
