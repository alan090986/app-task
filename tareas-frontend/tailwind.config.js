/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {colors: {
        primary: {
          light: "#93c5fd",
          DEFAULT: "#3b82f6",
          dark: "#1e40af",
        },
        success: {
          light: "#86efac",
          DEFAULT: "#22c55e",
          dark: "#15803d",
        },
        warning: {
          light: "#fde68a",
          DEFAULT: "#f59e0b",
          dark: "#b45309",
        },
      },
    },
  },
  plugins: [],
}


