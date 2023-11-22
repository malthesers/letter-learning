/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'red': '#FF0000',
        'blue': '#0000FF'
      }
    }
  },
  safelist: [
    'bg-black',
    'bg-red',
    'bg-blue'
  ],
  plugins: []
}
