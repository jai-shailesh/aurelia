"use client"

import { useEffect, useRef, useState } from "react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const notesRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const initGSAP = async () => {
      // NO TIME DELAY - immediate initialization
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.refresh(true)

      // Set initial states and KEEP them hidden
      gsap.set([titleRef.current, descriptionRef.current?.children, notesRef.current?.children], {
        opacity: 0,
        y: 50,
        scale: 0.9,
        visibility: "visible",
      })

      // Create timeline that starts PAUSED
      const tl = gsap.timeline({ paused: true })

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          descriptionRef.current?.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          notesRef.current?.children,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.2)",
          },
          "-=0.3",
        )

      // ScrollTrigger controls the timeline - PURE SCROLL BASED
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          console.log("About section entered")
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
    <section ref={sectionRef} className="relative py-8 md:py-12 px-4 md:px-6 overflow-hidden min-h-screen">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/vids/bg-video-poster.jpg"
      >
        <source src="/vids/bg-video.mp4" type="video/mp4" />
        <source src="/vids/bg-video.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-white to-amber-50/30 md:hidden" />
      <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

      <div className="relative max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-6 md:mb-8" style={{ visibility: "hidden" }}>
          <div className="backdrop-blur-md bg-white/15 md:bg-white/10 border border-white/30 md:border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3 md:mb-4 tracking-tight drop-shadow-lg">
                AURELIA
              </h2>
              <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-3 md:mb-4" />
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light italic tracking-wide">
                A fragrance born from the golden hour's embrace
              </p>
            </div>

            <div ref={descriptionRef} className="text-center space-y-4 md:space-y-6">
              <p className="text-base md:text-lg lg:text-xl text-white/95 leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm">
                AURELIA captures the delicate balance between strength and grace, where each note tells a story of
                feminine power and timeless beauty. Inspired by the ethereal glow of dawn, this fragrance embodies the
                essence of modern elegance.
              </p>

              <p className="text-sm md:text-base lg:text-lg text-white/85 leading-relaxed font-light max-w-2xl mx-auto drop-shadow-sm">
                Crafted for the woman who embraces both her vulnerability and her strength, AURELIA is more than a
                fragrance—it's a declaration of sophisticated femininity that transcends generations.
              </p>
            </div>
          </div>
        </div>

        <div ref={notesRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { title: "Top Notes", desc: "Bergamot, Pink Pepper, Pear", icon: "🌸" },
            { title: "Heart Notes", desc: "Rose Petals, Jasmine, Peony", icon: "🌹" },
            { title: "Base Notes", desc: "Sandalwood, Musk, Vanilla", icon: "🌿" },
          ].map((note, index) => (
            <div
              key={index}
              className="group backdrop-blur-md bg-white/15 md:bg-white/10 border border-white/30 md:border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl hover:bg-white/20 md:hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-3xl"
              style={{ visibility: "hidden" }}
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                  {note.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-white mb-3 md:mb-4 tracking-wide drop-shadow-lg">
                  {note.title}
                </h3>
                <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-3 md:mb-4" />
                <p className="text-white/90 font-light text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-sm">
                  {note.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <div className="inline-flex items-center space-x-2 md:space-x-4">
            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-white/40" />
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-white/60" />
            <div className="w-3 md:w-4 h-px bg-white/40" />
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-white/60" />
            <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-white/40" />
          </div>
        </div>
      </div>
    </section>
  )
}
