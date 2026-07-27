"use client"

import type React from "react"

import { ArrowRight, Github, Linkedin, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/track"

export default function HeroSection() {
  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleCVDownload = () => {
    trackEvent("cv_download", "cv_download")
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Muhammad Yasin</h1>
              <p className="text-xl text-muted-foreground">Full-Stack Software Engineer</p>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Full-stack software engineer specializing in Django/DRF, React, and Next.js, with a track record of designing scalable backend systems and AWS-based infrastructure. Experienced in RESTful API design, system architecture, and shipping production-ready applications with integrated AI capabilities.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="#contact" onClick={handleScrollTo("contact")}>
                <Button className="gap-1">
                  Contact Me <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/Muhammad_Yasin.pdf" download="Muhammad_Yasin_CV.pdf" onClick={handleCVDownload}>
                <Button variant="outline" className="text-black gap-1">
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
              </Link>
              <Link href="#projects" onClick={handleScrollTo("projects")}>
                <Button variant="outline" className="text-black">
                  View My Work
                </Button>
              </Link>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="https://github.com/MuhammadYasinSaleem" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/muhammadyasinsaleem/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-square overflow-hidden rounded-full border-4 border-primary/20 w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
              <img
                src="/yasin.png?height=400&width=400"
                alt="Muhammad Yasin"
                className="object-cover"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
