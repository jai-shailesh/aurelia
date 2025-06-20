"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-rose-800 block">{label}</label>}
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-rose-200 bg-white/50 backdrop-blur-sm px-4 py-3 text-rose-800 placeholder:text-rose-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20 transition-all duration-300 resize-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})

Textarea.displayName = "Textarea"

export { Textarea }
