import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./blog/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        accent: "#FF6B00",
        accentdark: "#E85D00",
        accentsoft: "#FFF3C4",
        sun: "#FFC400",
        sundark: "#B88A00",
        dock: "#0A0A0A",
        term: "#0D1117",
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', "Outfit", "sans-serif"],
        body: ["Outfit", "sans-serif"],
        "serif-read": ['"Source Serif 4"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "Menlo", "monospace"],
        script: [
          '"Cabinet Grotesk"',
          '"Noto Sans Devanagari"',
          '"Noto Sans Kannada"',
          '"Noto Sans Bengali"',
          '"Noto Sans Telugu"',
          '"Noto Sans Gujarati"',
          '"Noto Sans Tamil"',
          '"Nirmala UI"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [typography],
};
