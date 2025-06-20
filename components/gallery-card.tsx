"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface GalleryCardProps {
  src: string
  alt: string
  index: number
}

export default function GalleryCard({ src, alt, index }: GalleryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const initGSAP = async () => {
      // NO TIME DELAY - pure scroll trigger
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.refresh(true)

      gsap.set(cardRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 40,
        visibility: "visible",
      })

      const tl = gsap.timeline({ paused: true })

      tl.to(cardRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.1, // Only stagger delay, no time delay
      })

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 85%",
        onEnter: () => {
          console.log(`Gallery card ${index} entered`)
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
  }, [index, isMounted])

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500"
      data-cursor-hover
      style={{ visibility: "hidden" }}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={400}
          height={500}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
