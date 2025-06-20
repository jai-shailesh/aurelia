"use client"

import { useEffect, useRef, useState } from "react"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
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

      gsap.set(footerRef.current, {
        y: 50,
        opacity: 0,
        visibility: "visible",
      })

      const tl = gsap.timeline({ paused: true })

      tl.to(footerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 90%",
        onEnter: () => {
          console.log("Footer section entered")
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
    <footer
      ref={footerRef}
      className="py-4 px-6 bg-gradient-to-r from-rose-900 to-pink-900 text-white"
      style={{ visibility: "hidden" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-serif font-light">AURELIA</h3>
            <p className="text-rose-200 font-light leading-relaxed">
              The essence of timeless elegance, crafted for the modern woman who embraces both strength and grace.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">Quick Links</h4>
            <div className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Shipping Info", "Returns"].map((link) => (
                <button
                  key={link}
                  className="block text-rose-200 hover:text-white transition-colors duration-300 text-left"
                  data-cursor-hover
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">Follow Our Journey</h4>
            <div className="flex space-x-4">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-rose-200 hover:text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                  data-cursor-hover
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-rose-700 pt-4 text-center">
          <p className="text-rose-200 font-light">
            &copy; {new Date().getFullYear()} AURELIA. All rights reserved. Crafted with elegance.
          </p>
        </div>
      </div>
    </footer>
  )
}
