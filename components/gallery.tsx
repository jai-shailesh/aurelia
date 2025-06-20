"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import SectionTitle from "./section-title"
import GalleryCard from "./gallery-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const timelineRef = useRef<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  const images = [
    { src: "/images/gallery1.png", alt: "AURELIA with silk ribbons and flowers" },
    { src: "/images/gallery2.png", alt: "AURELIA elegant product shot" },
    { src: "/images/gallery3.png", alt: "AURELIA with roses and candles" },
    { src: "/images/gallery4.png", alt: "AURELIA elegant product shot" },
    { src: "/images/gallery5.png", alt: "AURELIA with roses and candles" },
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  const startDrag = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
    if (timelineRef.current) timelineRef.current.pause()
  }

  const updateDrag = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - dragStart
    if (galleryRef.current) {
      galleryRef.current.style.transform = `translateX(${diff}px)`
    }
  }

  const endDrag = () => {
    setIsDragging(false)
    if (galleryRef.current) galleryRef.current.style.transform = ""
    if (timelineRef.current) timelineRef.current.resume()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    startDrag(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      updateDrag(e.clientX)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault()
      updateDrag(e.touches[0].clientX)
    }
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) updateDrag(e.clientX)
    }
    const handleGlobalMouseUp = () => {
      if (isDragging) endDrag()
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging, dragStart])

  useEffect(() => {
    if (!isMounted) return

    const initGSAP = async () => {
      // NO TIME DELAY
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.refresh(true)

      // Auto-scroll for desktop only - controlled by ScrollTrigger
      if (galleryRef.current && window.innerWidth >= 768) {
        const gallery = galleryRef.current
        const galleryWidth = gallery.scrollWidth
        const viewportWidth = gallery.clientWidth

        if (galleryWidth > viewportWidth) {
          const tl = gsap.timeline({
            repeat: -1,
            ease: "none",
            paused: true,
          })

          tl.to(gallery, {
            x: -(galleryWidth - viewportWidth),
            duration: 15,
          }).to(gallery, {
            x: 0,
            duration: 15,
          })

          timelineRef.current = tl

          const pauseAnimation = () => tl.pause()
          const resumeAnimation = () => {
            if (!isDragging) tl.resume()
          }

          gallery.addEventListener("mouseenter", pauseAnimation)
          gallery.addEventListener("mouseleave", resumeAnimation)

          // PURE SCROLL TRIGGER - no delays
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              console.log("Gallery section entered")
              if (!isDragging) tl.play()
            },
            onLeave: () => {
              console.log("Gallery section left")
              tl.pause()
            },
            onEnterBack: () => {
              console.log("Gallery section entered back")
              if (!isDragging) tl.play()
            },
            onLeaveBack: () => {
              console.log("Gallery section left back")
              tl.pause()
            },
            markers: process.env.NODE_ENV === "development",
          })

          ScrollTrigger.refresh()

          return () => {
            gallery.removeEventListener("mouseenter", pauseAnimation)
            gallery.removeEventListener("mouseleave", resumeAnimation)
            tl.kill()
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
          }
        }
      }
    }

    initGSAP()
  }, [isMounted])

  return (
    <section ref={sectionRef} className="py-12 md:py-32 bg-gradient-to-b from-pink-100 via-rose to-amber-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Gallery" subtitle="Discover the artistry behind AURELIA" />

        <div className="hidden md:block mt-10">
          <div className="overflow-hidden mx-auto">
            <div
              ref={galleryRef}
              className="flex justify-center gap-16 w-fit mx-auto cursor-grab select-none"
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={endDrag}
            >
              {images.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-80">
                  <GalleryCard src={image.src} alt={image.alt} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden mt-16">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="px-4">
                      <GalleryCard src={image.src} alt={image.alt} index={index} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="p-2 bg-white/80 backdrop-blur-sm border-rose-200 hover:bg-rose-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="p-2 bg-white/80 backdrop-blur-sm border-rose-200 hover:bg-rose-50"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-center mt-4 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-rose-500 scale-125" : "bg-rose-200 hover:bg-rose-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <div className="inline-flex items-center space-x-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-rose-300" />
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="w-4 h-px bg-rose-300" />
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-rose-300" />
        </div>
      </div>
    </section>
  )
}
