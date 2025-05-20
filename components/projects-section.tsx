"use client"

import { ExternalLink, Github } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  category: string
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      image: "/ecom.png?height=300&width=500",
      tags: ["Next", "Node.js", "Sanity", "Stripe"," Tailwind CSS","Shadcn UI"],
      liveUrl: "https://e-commerce-project-navy.vercel.app/",
      githubUrl: "https://github.com/MuhammadYasinSaleem/E-Commerce-Project",
      category: "fullstack",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      image: "/todo.png?height=300&width=500",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      liveUrl: "https://todo-app-mern-one.vercel.app/",
      githubUrl: "https://github.com/MuhammadYasinSaleem/Todo-App-Mern",
      category: "fullstack",
    },
    {
      id: 3,
      title: "Weather App",
      description: "A weather app that displays current location weather and weather data of searched locations from multiple sources.",
      image: "/weather.png?height=300&width=500",
      tags: ["React", "OpenWeather API"],
      liveUrl: "https://weather-app-eight-delta-32.vercel.app/",
      githubUrl: "https://github.com/MuhammadYasinSaleem/Weather-App",
      category: "frontend",
    },
    {
      id: 4,
      title: "Fitness Exercise App",
      description: "A headless CMS with a user-friendly interface for managing digital content across platforms.",
      image: "/fitness.png?height=300&width=500",
      tags: ["React", "Material UI", "React-router-dom", "RapidAPI"],
      liveUrl: "https://fitness-exercise-app-nu.vercel.app/",
      githubUrl: "https://github.com/MuhammadYasinSaleem/Fitness-Exercise-App",
      category: "frontend",
    },
    {
      id: 5,
      title: "Real Estate Listing Platform",
      description: "A platform for listing and searching real estate properties with advanced filtering options.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Next.js", "PostgreSQL", "Google Maps API", "AWS S3"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "fullstack",
    },
    {
      id: 6,
      title: "API Gateway Service",
      description:
        "A microservice that acts as an API gateway, handling authentication, rate limiting, and request routing.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Node.js", "Express", "Redis", "Docker"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "backend",
    },
  ]

  const [filter, setFilter] = useState("all")

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="py-16 md:py-24 bg-[#161130]/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">A selection of my recent work</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-primary text-black"
                  : "border-white/20 text-black hover:text-white hover:bg-primary/20"
              }
            >
              All
            </Button>
            <Button
              variant={filter === "frontend" ? "default" : "outline"}
              onClick={() => setFilter("frontend")}
              className={
                filter === "frontend"
                  ? "bg-primary text-black"
                  : "border-white/20 text-black hover:text-white hover:bg-primary/20"
              }
            >
              Frontend
            </Button>
            <Button
              variant={filter === "backend" ? "default" : "outline"}
              onClick={() => setFilter("backend")}
              className={
                filter === "backend"
                  ? "bg-primary text-black"
                  : "border-white/20 text-black hover:text-white hover:bg-primary/20"
              }
            >
              Backend
            </Button>
            <Button
              variant={filter === "fullstack" ? "default" : "outline"}
              onClick={() => setFilter("fullstack")}
              className={
                filter === "fullstack"
                  ? "bg-primary text-black"
                  : "border-white/20 text-black hover:text-white hover:bg-primary/20"
              }
            >
              Full Stack
            </Button>
          </div>
        </div>
        <div className="mx-auto max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 grid">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden tilt-card">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  width={500}
                  height={300}
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border border-white/20 px-2.5 py-0.5 text-xs font-semibold text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="ghost" size="sm" className="gap-1 text-white hover:text-primary">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> Live
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm" className="gap-1 text-white hover:text-primary">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" /> Code
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
