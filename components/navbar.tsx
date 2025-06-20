"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onNavigate: (section: string) => void
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const initGSAP = async () => {
      // NO TIME DELAY
      const { gsap } = await import("gsap")

      gsap.set(navRef.current, {
        y: -60,
        opacity: 0,
      })

      const animation = gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2, // Minimal delay
      })

      return () => animation.kill()
    }

    initGSAP()
  }, [isMounted])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-rose-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          className="text-3xl font-serif font-light text-rose-800 cursor-pointer"
          onClick={() => onNavigate("hero")}
          data-cursor-hover
        >
          AURELIA
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {["About", "Gallery", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => onNavigate(item.toLowerCase())}
              className="text-rose-700 hover:text-rose-900 transition-colors duration-300 font-medium relative group"
              data-cursor-hover
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={() => onNavigate("contact")} className="hidden md:block">
          Get in Touch
        </Button>
      </div>
    </nav>
  )
}
