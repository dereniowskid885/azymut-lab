const {theme} = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    extend: {
      colors: {
        studio: {
          100: '#d6d0c4',
          200: '#c9c3b8',
          300: '#bfb8ae',
          400: '#b8b0a0',
          500: '#a8a096',
          600: '#9e9488',
        },
        warning: {
          bg: '#fdf6e9',
          border: '#e8c97a',
          text: '#7D664A',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
