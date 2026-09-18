import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f2f6fb",
          100: "#e3ecf6",
          200: "#c2d6ec",
          300: "#93b7dd",
          400: "#5d90c9",
          500: "#3a70b2",
          600: "#2a5794",
          700: "#234677",
          800: "#1e3a5f",
          900: "#12233c",
          950: "#0a1526",
        },
        accent: {
          50: "#fff9ec",
          100: "#ffefc8",
          200: "#ffdf8d",
          300: "#ffc94f",
          400: "#ffb320",
          500: "#f59500",
          600: "#d97400",
          700: "#b45307",
          800: "#92400e",
          900: "#78350f",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        prose: "70ch",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.06), 0 4px 16px rgba(16,24,40,.06)",
        lift: "0 10px 30px rgba(16,24,40,.12)",
      },
    },
  },
  plugins: [],
};

export default config;
