/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'red': '#EC4233',
        'blue': '#4285F6',
      }
    }
  },
  plugins: []
}
