import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        primary: "#4C5871",
        secondary: "#1E293B"
      },
      borderRadius: {},
      keyframes: {},
      maxWidth: {},
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        codeSans: ["Source Code Pro", "monospace"]
      },
      screens: {},
      transitionDuration: {
        medium: "300ms",
        long: "500ms"
      }
    }
  },
  plugins: [animate]
};
