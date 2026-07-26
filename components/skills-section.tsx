"use client"

import { CheckCircle2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SkillsSection() {
  const languagesSkills = ["Python", "JavaScript", "TypeScript", "SQL"]

  const backendSkills = ["Django", "Django REST Framework", "FastAPI", "Node.js", "Express.js", "RESTful APIs", "JWT Authentication"]

  const frontendSkills = ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"]

  const databaseSkills = ["PostgreSQL", "MongoDB"]

  const devopsSkills = ["AWS (EC2, S3, RDS)", "Docker", "Nginx", "GitHub Actions", "Celery", "Git"]

  const aiMlSkills = ["CNN-based Models", "Vision Transformers", "Retrieval-Augmented Generation (RAG)"]

  // Track visibility for each card
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(6).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize refs array
    cardRefs.current = cardRefs.current.slice(0, 6)

    // Create observers for each card
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            // Update only the specific card that is now visible
            setVisibleCards((prev) => {
              const updated = [...prev]
              updated[index] = true
              return updated
            })
            // Once this card has animated, stop observing it
            observer.unobserve(entry.target)
          }
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -100px 0px",
        },
      )

      observer.observe(ref)
      return observer
    })

    // Cleanup function to disconnect all observers
    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Skills</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Technologies and tools I work with</p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 grid">
          <Card
            ref={(el) => (cardRefs.current[0] = el)}
            className={`tilt-card ${visibleCards[0] ? "fade-in-left" : "fade-in-left-hidden"}`}
          >
            <CardHeader>
              <CardTitle>Languages</CardTitle>
              <CardDescription>Programming languages I use</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-2">
                {languagesSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card
            ref={(el) => (cardRefs.current[1] = el)}
            className={`tilt-card ${visibleCards[1] ? "fade-in-left" : "fade-in-left-hidden"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle>Backend Development</CardTitle>
              <CardDescription>Server-side frameworks and APIs</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-2">
                {backendSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card
            ref={(el) => (cardRefs.current[2] = el)}
            className={`tilt-card ${visibleCards[2] ? "fade-in-left" : "fade-in-left-hidden"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <CardTitle>Frontend Development</CardTitle>
              <CardDescription>Building responsive user interfaces</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-2">
                {frontendSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card
            ref={(el) => (cardRefs.current[3] = el)}
            className={`tilt-card ${visibleCards[3] ? "fade-in-left" : "fade-in-left-hidden"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader>
              <CardTitle>Databases</CardTitle>
              <CardDescription>Data storage solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-2">
                {databaseSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card
            ref={(el) => (cardRefs.current[4] = el)}
            className={`tilt-card ${visibleCards[4] ? "fade-in-left" : "fade-in-left-hidden"}`}
            style={{ animationDelay: "0.4s" }}
          >
            <CardHeader>
              <CardTitle>DevOps & Cloud</CardTitle>
              <CardDescription>Infrastructure and deployment</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-2">
                {devopsSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card
            ref={(el) => (cardRefs.current[5] = el)}
            className={`tilt-card ${visibleCards[5] ? "fade-in-left" : "fade-in-left-hidden"}`}
            style={{ animationDelay: "0.5s" }}
          >
            <CardHeader>
              <CardTitle>AI/ML</CardTitle>
              <CardDescription>Machine learning and AI technologies</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 gap-2">
                {aiMlSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
