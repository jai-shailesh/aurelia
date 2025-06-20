"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll("button, a, input, textarea, [data-cursor-hover]")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("resize", checkMobile)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-br from-rose-300 to-rose-500 rounded-full pointer-events-none z-[9999] transition-all duration-150 ease-out shadow-lg"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px) scale(${isHovering ? 0 : 1})`,
          opacity: isHovering ? 0 : 1,
        }}
      />

      {/* Outer ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-rose-400/30 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px) scale(${isHovering ? 1.8 : 1})`,
          borderWidth: isHovering ? "2px" : "1px",
          borderColor: isHovering ? "rgba(244, 63, 94, 0.6)" : "rgba(244, 63, 94, 0.3)",
        }}
      />

      {/* Hover state - elegant filled circle */}
      <div
        className="fixed top-0 left-0 w-12 h-12 bg-gradient-to-br from-rose-200/20 to-rose-400/20 rounded-full pointer-events-none z-[9997] transition-all duration-300 ease-out backdrop-blur-sm"
        style={{
          transform: `translate(${mousePosition.x - 24}px, ${mousePosition.y - 24}px) scale(${isHovering ? 1 : 0})`,
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Subtle glow effect on hover */}
      <div
        className="fixed top-0 left-0 w-16 h-16 bg-rose-300/10 rounded-full pointer-events-none z-[9996] transition-all duration-500 ease-out blur-md"
        style={{
          transform: `translate(${mousePosition.x - 32}px, ${mousePosition.y - 32}px) scale(${isHovering ? 1 : 0})`,
          opacity: isHovering ? 1 : 0,
        }}
      />
    </>
  )
}
