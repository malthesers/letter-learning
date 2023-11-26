/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins, sans-serif, system-ui']
    },
    boxShadow: {
      shadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)'
    },
    extend: {
      colors: {
        'red': '#EC4233',
        'blue': '#4285F6',
      }
    }
  },
  plugins: []
}
