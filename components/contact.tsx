"use client"

import { useEffect, useRef, useState } from "react"
import SectionTitle from "./section-title"
import ContactForm from "./contact-form"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Wait for DOM to be ready
      await new Promise((resolve) => setTimeout(resolve, 100))
      ScrollTrigger.refresh()

      // Set initial state
      gsap.set(contentRef.current, {
        x: -50,
        opacity: 0,
      })

      const animation = gsap.to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          refreshPriority: -1,
        },
      })

      return () => {
        animation.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }

    const cleanup = loadGSAP()
    return () => {
      cleanup.then((cleanupFn) => cleanupFn && cleanupFn())
    }
  }, [isClient])

  if (!isClient) {
    return <div className="min-h-screen" />
  }

  return (
    <section ref={sectionRef} className="py-4 md:py-24 px-6 bg-gradient-to-b from-rose-100/50 to-rose-85/50">
      <div className="max-w-4xl mx-auto">
        <div ref={contentRef}>
          <SectionTitle
            title="Let's Stay Connected"
            subtitle="Share your thoughts and be part of the AURELIA journey"
          />

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
