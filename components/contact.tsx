"use client"

import { useEffect, useRef } from "react"
import SectionTitle from "./section-title"
import ContactForm from "./contact-form"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    loadGSAP()
  }, [])

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
