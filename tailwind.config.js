const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.red,
      rose: colors.rose,
      amber: colors.amber,
      yellow: colors.yellow,
      blue: colors.blue,
      green: colors.green,
      lime: colors.lime,
      purple: colors.purple,
      orange: colors.orange,
    },
    
    extend: {
      fontSize: {
        'xxs': '.65rem',
      },
    },
  },
  plugins: [],
}