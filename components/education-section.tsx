"use client"

import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Education = {
  degree: string
  institution: string
  location: string
  period: string
  description: string
}

export default function EducationSection() {
  const educationHistory: Education[] = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Bahria University",
      location: "Lahore, Pakistan",
      period: "2021 - 2025",
      description:
        "CGPA 3.83/4.0 - Gold Medalist. Specialized in software engineering and web development with focus on building scalable applications and AI-powered solutions.",
    }
  ]

  // Track visibility for each card individually
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(educationHistory.length).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize refs array
    cardRefs.current = cardRefs.current.slice(0, educationHistory.length)

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
          // Lower threshold to trigger earlier
          threshold: 0.15,
          // Adjust rootMargin to trigger when card is more in view
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
  }, [educationHistory.length])

  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Education</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              My academic background and learning journey
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl py-12 space-y-8">
          {educationHistory.map((edu, index) => (
            <Card
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`overflow-hidden transition-all duration-300 tilt-card ${
                visibleCards[index] ? "education-card" : "education-card-hidden"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl md:text-2xl">{edu.degree}</CardTitle>
                    <CardDescription className="text-base">{edu.institution}</CardDescription>
                  </div>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                    {edu.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{edu.location}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex items-center justify-center pt-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>Continuous learner, always expanding my knowledge through online courses and self-study</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
