"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

interface GalleryCardProps {
  src: string
  alt: string
  index: number
}

export default function GalleryCard({ src, alt, index }: GalleryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        cardRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    loadGSAP()
  }, [index])

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500"
      data-cursor-hover
    >
      <div className="aspect-[4/5] overflow-hidden">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={400}
          height={500}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
