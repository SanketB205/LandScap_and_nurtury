/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f8e9',
          100: '#dcedc8',
          200: '#c5e1a5',
          300: '#aed581',
          400: '#9ccc65',
          500: '#8bc34a',
          600: '#7cb342',
          700: '#558b2f',
          800: '#2E7D32',
          900: '#1b5e20',
          950: '#0d3311',
        },
        secondary: {
          100: '#e8f5e9',
          200: '#c8e6c9',
          300: '#A5D6A7',
          400: '#81c784',
          500: '#66bb6a',
        },
        nature: {
          50: '#f7f9f5',
          100: '#ecf1e8',
          200: '#d7e1ce',
          300: '#b8c9ab',
          400: '#93aa82',
          500: '#718b5b',
          600: '#586d47',
          700: '#415135',
          800: '#2e3a26',
          900: '#1c2317',
          950: '#0e120b',
          cream: '#fafaf5',
          sand: '#f5f0e8',
          bark: '#795548',
          leaf: '#388e3c',
          sky: '#e3f2fd',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(46, 125, 50, 0.12)',
        'card-hover': '0 8px 30px rgba(46, 125, 50, 0.2)',
        'nav': '0 2px 20px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'gradient-nature': 'linear-gradient(135deg, #2E7D32 0%, #388e3c 50%, #558b2f 100%)',
        'gradient-hero': 'linear-gradient(to bottom, rgba(27,94,32,0.7) 0%, rgba(46,125,50,0.4) 100%)',
      }
    },
  },
  plugins: [],
}
