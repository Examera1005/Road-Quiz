import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'],
      },
      colors: {
        primary: {
          50: '#eef8ff',
          100: '#d6edff',
          200: '#aeddff',
          300: '#7bcbff',
          400: '#49b6ff',
          500: '#1f9fff',
          600: '#0b83e6',
          700: '#0666b4',
          800: '#084f8a',
          900: '#0b416f',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
