"use client"
import { useRef } from "react"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function AureliaWebsite() {
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const scrollToSection = (section: string) => {
    const refs = {
      hero: heroRef,
      about: aboutRef,
      gallery: galleryRef,
      contact: contactRef,
    }

    const targetRef = refs[section as keyof typeof refs]
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleJoinWaitlist = () => {
    scrollToSection("contact")
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <CustomCursor />

      <Navbar onNavigate={scrollToSection} />

      <main>
        <section ref={heroRef}>
          <Hero onJoinWaitlist={handleJoinWaitlist} />
        </section>

        <section ref={aboutRef}>
          <About />
        </section>

        <section ref={galleryRef}>
          <Gallery />
        </section>

        <section ref={contactRef}>
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  )
}
