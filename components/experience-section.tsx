"use client"

import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Experience = {
  position: string
  company: string
  location: string
  period: string
  description: string
  responsibilities: string[]
  companyUrl?: string
}

export default function ExperienceSection() {
  const workExperience: Experience[] = [
    {
      position: "Mern Stack Developer",
      company: "Active Sloth",
      location: "Lahore",
      period: "Aug 2024 - Feb 2025",
      description: "Built and maintained full-stack web applications using MongoDB, Express, React, and Node.js.",
      responsibilities: [
        "Developed full-stack web applications using MongoDB, Express.js, React, and Node.js.",
        "Built and consumed RESTful APIs for seamless front-end and back-end integration.",
        "Integrated third-party services and APIs to extend application functionality",
        "Optimized application performance and fixed bugs to improve user experience",
      ],
      companyUrl: "",
    }
  ]

  // Track visibility for each card individually
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(workExperience.length).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize refs array
    cardRefs.current = cardRefs.current.slice(0, workExperience.length)

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
  }, [workExperience.length])

  return (
    <section id="experience" className="py-16 md:py-24 bg-[#161130]/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Experience</h2>
            <p className="mx-auto max-w-[700px] text-white/70 md:text-xl">My professional journey and work history</p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl py-12 space-y-8">
          {workExperience.map((exp, index) => (
            <Card
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`overflow-hidden transition-all duration-300 tilt-card ${
                visibleCards[index] ? "education-card" : "education-card-hidden"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-xl md:text-2xl text-white">{exp.position}</CardTitle>
                    <CardDescription className="text-base flex items-center text-white/70">
                      {exp.company}
                      {exp.companyUrl && (
                        <Link
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 inline-flex items-center text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span className="sr-only">Company website</span>
                        </Link>
                      )}
                    </CardDescription>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-[#ffffff1a] px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                    {exp.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-white/70">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{exp.location}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-white/70">{exp.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Key Responsibilities:</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-white/70">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex items-center justify-center pt-6">
            <div className="flex items-center space-x-2 text-sm text-white/70">
              <Briefcase className="h-5 w-5 text-primary" />
              <span>Open to new opportunities and collaborations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
