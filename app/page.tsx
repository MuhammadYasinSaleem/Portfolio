"use client"

import { ChevronDown } from "lucide-react"
import AboutSection from "@/components/about-section"
import BlogSection from "@/components/blog-section"
import CertificationsSection from "@/components/certifications-section"
import ContactSection from "@/components/contact-section"
import EducationSection from "@/components/education-section"
import ExperienceSection from "@/components/experience-section"
import Footer from "@/components/footer"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import InterestsSection from "@/components/interests-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="container mx-auto flex justify-center py-8">
          <a
            href="#about"
            className="animate-bounce"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("about")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
              <ChevronDown className="h-6 w-6" />
              <span className="sr-only">Scroll down</span>
            </Button>
          </a>
        </div>
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ProjectsSection />
        <SkillsSection />
        <BlogSection />
        <InterestsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
