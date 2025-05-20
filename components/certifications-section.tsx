"use client"

import { Award, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Certification = {
  name: string
  organization: string
  date: string
  credentialId: string
  verificationUrl: string
  description: string
  skills: string[]
}

export default function CertificationsSection() {
  const certifications: Certification[] = [
    {
      name: "Developing Front-End Apps with React",
      organization: "IBM",
      date: "March 2025",
      credentialId: "8GQTFMY7VEAP",
      verificationUrl: "https://coursera.org/verify/8GQTFMY7VEAP",
      description: "Validates expertise in building dynamic, responsive front-end applications using React and modern web development tools.",
      skills: ["React","React Hooks","API integration","React Router", "Redux"],
    },
    {
      name: "Developing Back-End Apps with Node.js and Express",
      organization: "IBM",
      date: "March 2025",
      credentialId: "FOY62O5ALD6G",
      verificationUrl: "https://coursera.org/verify/FOY62O5ALD6G",
      description: "Comprehensive certification covering back-end development using Node.js, Express, REST APIs, and authentication techniques.",
      skills: ["Node.js", "Express.js", "RESTful APIs", "Authentication and Session Management","JWT"],
    }
  ]

  // Track visibility for each card individually
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(certifications.length).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize refs array
    cardRefs.current = cardRefs.current.slice(0, certifications.length)

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
  }, [certifications.length])

  return (
    <section id="certifications" className="py-16 md:py-24 bg-[#161130]/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Certifications</h2>
            <p className="mx-auto max-w-[700px] text-white/70 md:text-xl">
              Professional certifications and credentials
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl py-12 space-y-8">
          {certifications.map((cert, index) => (
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
                    <CardTitle className="text-xl md:text-2xl text-white">{cert.name}</CardTitle>
                    <CardDescription className="text-base flex items-center text-white/70">
                      {cert.organization}
                      <Link
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="sr-only">Verify certification</span>
                      </Link>
                    </CardDescription>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-[#ffffff1a] px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                    {cert.date}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-white/70">
                    <Award className="mr-1 h-4 w-4" />
                    <span>Credential ID: {cert.credentialId}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Issued: {cert.date}</span>
                  </div>
                  <p className="text-white/70">{cert.description}</p>
                  <div>
                    <h4 className="font-medium text-white mb-2">Skills Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-full border border-[#ffffff1a] px-2.5 py-0.5 text-xs font-semibold bg-primary/5 text-white/90"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex items-center justify-center pt-6">
            <div className="flex items-center space-x-2 text-sm text-white/70">
              <Award className="h-5 w-5 text-primary" />
              <span>Continuously expanding knowledge through new certifications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
