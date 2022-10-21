/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      skew: {
        '20': '20deg',
        '25': '25deg',
        '60': '60deg',
      }
    },
  },
  plugins: [],
}