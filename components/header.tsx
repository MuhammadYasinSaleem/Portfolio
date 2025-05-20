"use client"

import type React from "react"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
  }

  const navItems = [
    { name: "about", label: "About" },
    { name: "education", label: "Education" },
    { name: "certifications", label: "Certifications" },
    { name: "experience", label: "Experience" },
    { name: "skills", label: "Skills" },
    { name: "interests", label: "Interests" },
    { name: "projects", label: "Projects" },
    { name: "contact", label: "Contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl group">
          Muhammad<span className="text-primary transition-colors duration-300">Yasin</span>
          <span className="block h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={`#${item.name}`}
              className="relative text-sm font-medium transition-colors group py-1"
              onClick={handleScrollTo(item.name)}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                {item.label}
              </span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="transition-transform duration-200 hover:bg-primary/10 hover:text-primary"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-200 hover:rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200 hover:rotate-90" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4 pb-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={`#${item.name}`}
                className="text-sm font-medium flex items-center transition-all group"
                onClick={handleScrollTo(item.name)}
              >
                <span className="h-px w-4 bg-primary mr-2 transition-all duration-300 group-hover:w-8"></span>
                <span className="transition-colors duration-300 group-hover:text-primary">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
