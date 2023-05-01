/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
      sans: ["Open Sans", "sans-serif"],
      Pathway: ["Pathway Extreme", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
