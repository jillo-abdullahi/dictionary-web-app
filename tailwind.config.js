/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          700: "#050505",
          600: "#1F1F1F",
          500: "#2D2D2D",
          400: "#3A3A3A",
          300: "#757575",
          200: "#E9E9E9",
          100: "#F4F4F4",
        },
        red: {
          DEFAULT: "#FF5252",
        },
        purple: {
          DEFAULT: "#A445ED",
        },
      },
      fontFamily: {
        inconsolata: ["Inconsolata", "monospace"],
        inter: ["Inter", "sans-serif"],
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};
