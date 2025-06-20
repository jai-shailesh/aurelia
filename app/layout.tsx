import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AURELIA - The Essence of Timeless Elegance",
  description:
    "Discover AURELIA, a luxury perfume that captures the delicate balance between strength and grace. Experience the fragrance that defines modern femininity.",
  keywords: "luxury perfume, AURELIA, fragrance, beauty, elegance, rose gold, feminine, Dior inspired",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" async />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" async />
      </head>
      <body className="font-sans antialiased cursor-none">{children}</body>
    </html>
  )
}
