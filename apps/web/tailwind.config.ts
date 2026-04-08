import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        panda: {
          50:  '#f1f8e9',
          100: '#dcedc8',
          200: '#c5e1a5',
          300: '#aed581',
          400: '#9ccc65',
          500: '#8bc34a',
          600: '#7cb342',
          700: '#689f38',
          800: '#558b2f',
          900: '#33691e',
          dark: '#1b5e20',
        },
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'STSong', 'serif'],
        sans:  ['Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      animation: {
        'float':  'float 4s ease-in-out infinite',
        'munch':  'munch 1.5s ease-in-out infinite',
        'blink':  'blink 5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        munch: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%':       { transform: 'rotate(5deg)' },
        },
        blink: {
          '0%, 94%, 100%': { transform: 'scaleY(1)' },
          '96%':             { transform: 'scaleY(0.1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
