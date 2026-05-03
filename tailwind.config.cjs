/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './constants.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'lab-white': '#F4F4F2',
        'lab-gray': '#E8E8E6',
        'lab-text': '#1A1A1A',
        'lab-accent': '#2C3E50',
        'void-black': '#0C1420',
        'void-gray': '#142031',
        'void-text': '#DBE7F4',
        'neon-cyan': '#7DDDE8',
        'neon-teal': '#6BAFC2',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
