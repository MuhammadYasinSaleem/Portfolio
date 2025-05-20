"use client"

import type React from "react"
import { Heart, Code, Palette, BookOpen, Globe, Coffee, Lightbulb, Camera } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type Interest = {
  name: string
  description: string
  icon: React.ReactNode
}

export default function InterestsSection() {
  const interests: Interest[] = [
    {
      name: "Open Source",
      description: "Contributing to and maintaining open source projects that help the developer community.",
      icon: <Code className="h-8 w-8 text-primary" />,
    },
    {
      name: "Web Performance",
      description: "Optimizing websites and applications for speed, accessibility, and user experience.",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
    },
    {
      name: "UI/UX Design",
      description: "Creating intuitive and beautiful user interfaces that enhance the user experience.",
      icon: <Palette className="h-8 w-8 text-primary" />,
    },
    {
      name: "Technical Writing",
      description: "Sharing knowledge through blog posts, tutorials, and documentation.",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
    },
    {
      name: "Travel",
      description: "Exploring new places, cultures, and cuisines around the world.",
      icon: <Globe className="h-8 w-8 text-primary" />,
    },
    {
      name: "Tea",
      description: "Brewing and tasting different tea varieties and brewing methods.",
      icon: <Coffee className="h-8 w-8 text-primary" />,
    },
    {
      name: "Photography",
      description: "Capturing moments and scenes through the lens of a camera.",
      icon: <Camera className="h-8 w-8 text-primary" />,
    },
    {
      name: "Community Building",
      description: "Organizing and participating in tech meetups and community events.",
      icon: <Heart className="h-8 w-8 text-primary" />,
    },
  ]

  // Track visibility for each card
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(interests.length).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize refs array
    cardRefs.current = cardRefs.current.slice(0, interests.length)

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
  }, [interests.length])

  return (
    <section id="interests" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Interests & Passions</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              What drives me beyond code and technology
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {interests.map((interest, index) => (
              <Card
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`overflow-hidden transition-all duration-300 hover:-translate-y-1 tilt-card ${
                  visibleCards[index] ? "fade-in-left" : "fade-in-left-hidden"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 transition-colors duration-300">{interest.icon}</div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">{interest.name}</h3>
                    <p className="text-sm text-muted-foreground">{interest.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-center pt-12 text-center">
            <p className="max-w-[600px] text-muted-foreground">
              I believe that having diverse interests makes me a more well-rounded developer and person. These passions
              fuel my creativity and problem-solving abilities in my professional work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
