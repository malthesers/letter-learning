import { PluginAPI } from 'tailwindcss/types/config'

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins, sans-serif, system-ui']
    },
    boxShadow: {
      colour: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)'
    },
    extend: {
      colors: {
        blue: '#4285F6',
        red: '#EC4233',
        yellow: '#F9BE04',
        green: '#33A955',
        purple: '#AF52DE',
        orange: '#FF9501'
      }
    }
  },
  plugins: [
    ({ addUtilities }: PluginAPI) => {
      addUtilities({
        '.grid-center': {
          'grid-area': '1 / 1 / 1 / 1'
        }
      })
    }
  ]
}
