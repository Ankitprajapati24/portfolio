/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        hot: "#FF4F00",
        hotdark: "#E04500",
        dock: "#09090B",
        term: "#0D1117",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', "Outfit", "sans-serif"],
        body: ["Outfit", "sans-serif"],
        mono: ['"JetBrains Mono"', "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
