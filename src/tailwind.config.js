const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors[process.env.THEME_TAILWIND_COLOR],
        'bg-semi-75': 'rgba(0, 0, 0, 0.75)'
      }
    }
  },
  variants: {},
  plugins: []
}
