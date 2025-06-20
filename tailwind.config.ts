import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"], 
        serif: ["Georgia", "serif"],
      },
      colors: {
        "blush-pink": "#f5e6eb",
        "rose-gold": "#dca3ae",
        "text-dark": "#2d2d2d",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      backdropBlur: {
        luxury: "20px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
