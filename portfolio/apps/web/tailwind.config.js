/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#070A0A",
        panel: "#0C1111",
        text: "#EAF2F2",
        muted: "#9FB1B1",
        accent: "#22C55E"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,197,94,0.35), 0 0 30px rgba(34,197,94,0.12)"
      },
      transitionDuration: {
        150: "150ms",
        300: "300ms",
        500: "500ms",
      },
    }
  },
  plugins: []
};



