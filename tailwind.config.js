/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          50: '#FBF3F4',
          100: '#F5E2E5',
          200: '#E9B9C0',
          300: '#DD8F9B',
          400: '#C56172',
          500: '#9F3A4C',
          600: '#7B2838',
          700: '#5B1A2A',
          800: '#3F121E',
          900: '#260A12',
        },
        oak: {
          50: '#FBF8F1',
          100: '#F5EED9',
          200: '#E9D9A8',
          300: '#DCC477',
          400: '#C9A961',
          500: '#AB863D',
          600: '#8B6914',
          700: '#6A5210',
          800: '#4A3A0B',
          900: '#2B2207',
        },
        vineyard: {
          50: '#F3F6F3',
          100: '#E1E9E1',
          200: '#C0D3C0',
          300: '#9FBC9F',
          400: '#6E956E',
          500: '#4F7A4F',
          600: '#3D5A3D',
          700: '#2D422D',
          800: '#1E2C1E',
          900: '#0F160F',
        },
        champagne: {
          50: '#FDFCF7',
          100: '#FAF5E9',
          200: '#F3E6C5',
          300: '#ECD7A1',
          400: '#E0C17A',
          500: '#C9A961',
          600: '#B08E42',
          700: '#8C6E32',
          800: '#665024',
          900: '#3D3116',
        },
        cream: {
          50: '#FDFBF7',
          100: '#FAF6ED',
          200: '#F5F1E8',
          300: '#EDE6D6',
          400: '#DED3B8',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        elegant: '0 4px 20px rgba(91, 26, 42, 0.08)',
        card: '0 8px 30px rgba(91, 26, 42, 0.12)',
        gold: '0 4px 20px rgba(201, 169, 97, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'draw': 'draw 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
