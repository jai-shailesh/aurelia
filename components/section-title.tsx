"use client"

import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  centered?: boolean
}

export default function SectionTitle({ title, subtitle, className, centered = true }: SectionTitleProps) {
  return (
    <div className={cn("space-y-4", centered && "text-center", className)}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-rose-800 leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-rose-600 font-light max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      <div className="w-16 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto" />
    </div>
  )
}
