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
      position: "Software Engineer",
      company: "Innovaxel Private Limited",
      location: "Lahore, Punjab, Pakistan",
      period: "Aug 2025 -- Present",
      description: "Full-stack software engineer specializing in Django/DRF, React, and Next.js, designing scalable backend systems and AWS-based infrastructure for production applications.",
      responsibilities: [
        "PeopleX HRM: Serving as main developer on an internal HRM SaaS product with 100+ RESTful API endpoints, consolidating employee management, leave & attendance, CRM, and finance operations.",
        "Built configurable leave policy engine supporting per-type rules including probation eligibility, carry-forward limits, and automated nightly balance recalculation via Celery.",
        "Developed custom in-house e-signature workflow supporting multi-recipient sequential signing with full audit trail, removing dependency on third-party providers.",
        "Advance Alloy Wheel Repairs: Built foundational Django/DRF API endpoints and PostgreSQL schemas, growing it into a full production-grade business management system replacing WorkflowMax, HubSpot CRM, and Asana.",
        "Architected scalable backend with Redis-backed Celery workers and cron job scheduler for background processing across data-sync pipelines and high-volume reconciliation workflows.",
        "Reduced manual invoicing effort by 80% by integrating Xero's financial APIs to automate full invoice lifecycle and backfilled 37,000+ historical invoices.",
        "Implemented Xero webhook listeners to process financial events in real time, keeping accounting state synchronized with minimal latency.",
        "Built responsive React.js frontend using short polling to maintain live UI state across data-heavy financial and operational modules used daily in production.",
        "Owned DevOps pipeline end-to-end: AWS S3 for media storage, Nginx for static/media serving, isolated EC2 instances for staging/production, and GitHub Actions CI/CD.",
        "360 HR: Contributed to backend development of client-facing HR management platform, building API functionality for employee and organizational data management.",
      ],
      companyUrl: "",
    },
    {
      position: "Software Engineer Intern",
      company: "Technier",
      location: "Lahore, Pakistan",
      period: "Mar 2025 -- Jul 2025",
      description: "MERN-stack development team member building UI components and backend REST API endpoints for internal features across client-facing modules.",
      responsibilities: [
        "Built and maintained UI components and pages in React.js as part of a MERN-stack development team, contributing to multiple internal features.",
        "Developed backend REST API endpoints using Node.js and Express.js to support frontend functionality and data flow between client and server.",
        "Designed and worked with MongoDB schemas and queries to support application data storage and retrieval needs.",
        "Identified and resolved bugs across the frontend and backend, improving feature stability and code quality under guidance from senior engineers.",
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
    <section id="experience" className="py-16 md:py-24 bg-card/50">
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
                  <span className="inline-flex items-center rounded-full border border-white/10 px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
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
