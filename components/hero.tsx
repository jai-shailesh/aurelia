"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeroProps {
  onJoinWaitlist: () => void
}

export default function Hero({ onJoinWaitlist }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subheadlineRef = useRef<HTMLDivElement>(null)
  const discoverRef = useRef<HTMLHeadingElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      // Wait for DOM to be ready
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Create floating particles
      if (particlesRef.current) {
        const particles = Array.from({ length: 20 }, (_, i) => {
          const particle = document.createElement("div")
          particle.className = "absolute w-1 h-1 bg-rose-300/40 rounded-full"
          particle.style.left = `${Math.random() * 100}%`
          particle.style.top = `${Math.random() * 100}%`
          particlesRef.current?.appendChild(particle)
          return particle
        })

        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: -100,
            x: Math.random() * 100 - 50,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            delay: i * 0.2,
            ease: "power1.out",
          })
        })
      }

      // Set initial states
      gsap.set(titleRef.current, {
        scale: 0.8,
        opacity: 0,
        z: -10,
      })

      gsap.set(productRef.current, {
        scale: 0.7,
        opacity: 0,
        y: 50,
      })

      gsap.set(ctaRef.current, {
        y: 30,
        opacity: 0,
      })

      gsap.set(headlineRef.current, {
        x: -50,
        opacity: 0,
      })

      gsap.set(subheadlineRef.current, {
        x: 50,
        opacity: 0,
      })

      gsap.set(discoverRef.current, {
        y: -20,
        opacity: 0,
      })

      // Hero animations timeline
      const tl = gsap.timeline({ delay: 1 })

      tl.to(titleRef.current, {
        scale: 1,
        opacity: 0.1,
        duration: 1.2,
        ease: "power2.out",
      })
        .to(
          discoverRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8",
        )
        .to(
          productRef.current,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        )
        .to(
          headlineRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .to(
          subheadlineRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        )

      // Continuous product float animation
      gsap.to(productRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })

      return () => {
        tl.kill()
        gsap.killTweensOf([productRef.current, particlesRef.current?.children])
      }
    }

    const cleanup = loadGSAP()
    return () => {
      cleanup.then((cleanupFn) => cleanupFn && cleanupFn())
    }
  }, [isClient])

  if (!isClient) {
    return <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100" />
  }

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating particles background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100" />

      {/* Subheadline - Bottom Right - Hidden on mobile */}
      <div
        ref={subheadlineRef}
        className="hidden md:block absolute bottom-4 md:bottom-8 right-4 md:right-8 z-30 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-right"
      >
        <div className="space-y-1">
          <div
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tighter text-rose-800"
            style={{ fontFamily: "Staatliches, Arial Black, sans-serif" }}
          >
            A TRUE ICON
          </div>
          <div
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black uppercase tracking-tighter text-rose-800"
            style={{ fontFamily: "Staatliches, Arial Black, sans-serif" }}
          >
            OF REFINED
          </div>
          <div
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black uppercase tracking-tighter text-rose-800"
            style={{ fontFamily: "Staatliches, Arial Black, sans-serif" }}
          >
            BEAUTY.
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Discover heading - Responsive */}
        <h1
          ref={discoverRef}
          className="absolute -top-8 sm:-top-6 md:-top-4 lg:-top-2 left-1/2 transform -translate-x-1/2 z-15 text-center px-4 max-w-xs sm:max-w-sm md:max-w-none md:whitespace-nowrap"
        >
          <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light tracking-wide sm:tracking-wider md:tracking-widest text-rose-600 uppercase leading-tight">
            DISCOVER THE FRAGRANCE WHERE GRACE MEETS{" "}
            <span
              className="font-serif italic font-normal normal-case text-rose-400 block sm:inline"
              style={{ fontFamily: "Snell Roundhand, cursive" }}
            >
              Allure
            </span>
          </span>
        </h1>

        {/* Background Title */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <h1 className="text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-serif font-thin text-rose-800 select-none">
            AURELIA
          </h1>
        </div>

        {/* Product Image - Center */}
        <div ref={productRef} className="relative z-20 mb-8">
          <Image
            src="/images/hero-product.png"
            alt="AURELIA Perfume"
            width={400}
            height={600}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mx-auto drop-shadow-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-radial from-rose-200/20 via-transparent to-transparent blur-3xl" />
        </div>

        {/* CTA Section - Closer to product */}
        <div ref={ctaRef} className="relative z-20">
          <Button
            onClick={onJoinWaitlist}
            className="
              px-6 py-3 sm:px-8 sm:py-4 
              bg-gradient-to-r from-pink-200 to-rose-300 
              border border-yellow-400 
              text-rose-900 
              font-black 
              uppercase 
              tracking-wide 
              rounded-sm 
              hover:bg-gradient-to-r 
              hover:from-yellow-500 
              hover:to-yellow-600 
              hover:text-white 
              transition-all 
              duration-300 
              ease-in-out
              shadow-lg
              hover:shadow-xl
              text-sm sm:text-base
            "
          >
            Join the Waiting List
          </Button>
        </div>
      </div>
    </section>
  )
}
