"use client"

import { useEffect, useRef, useState } from "react"
import SectionTitle from "./section-title"
import ContactForm from "./contact-form"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const initGSAP = async () => {
      // NO TIME DELAY
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.refresh(true)

      gsap.set(contentRef.current, {
        x: -40,
        opacity: 0,
        visibility: "visible",
      })

      const tl = gsap.timeline({ paused: true })

      tl.to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          console.log("Contact section entered")
          tl.play()
        },
        onLeave: () => tl.reverse(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
        markers: process.env.NODE_ENV === "development",
      })

      ScrollTrigger.refresh()

      return () => {
        tl.kill()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }

    initGSAP()
  }, [isMounted])

  return (
    <section ref={sectionRef} className="py-4 md:py-24 px-6 bg-gradient-to-b from-rose-100/50 to-rose-85/50">
      <div className="max-w-4xl mx-auto">
        <div ref={contentRef} style={{ visibility: "hidden" }}>
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
