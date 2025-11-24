/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6A994E",
        accent: "#F4A261",
        "background-light": "#F5F5F5",
        "background-dark": "#1a1a1a",
        "text-light": "#333333",
        "text-dark": "#e0e0e0",
      },
      fontFamily: {
        display: ["Space Grotesk", "Noto Sans JP", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
};
