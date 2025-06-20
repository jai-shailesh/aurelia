"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  label?: string
  children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", label, children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-lg hover:shadow-xl",
      secondary: "bg-white/20 backdrop-blur-md border border-white/30 text-rose-800 hover:bg-white/30",
      outline: "border-2 border-rose-400 text-rose-600 hover:bg-rose-400 hover:text-white bg-white",
      ghost: "text-rose-600 hover:bg-rose-50",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    }

    return (
      <button
        className={cn(
          "font-medium rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2",
          variants[variant],
          sizes[size],
          className,
        )}
        ref={ref}
        {...props}
      >
        {label || children}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }
