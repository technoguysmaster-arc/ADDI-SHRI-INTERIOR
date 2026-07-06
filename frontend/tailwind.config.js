/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:    '#E8550A',   // Warm burnt orange — AADI SHRI signature
          primaryHov: '#C94308',   // Darker hover state
          secondary:  '#1C1C2E',   // Deep navy-black for headings
          accent:     '#F5A623',   // Golden amber for highlights
          cream:      '#FFF8F2',   // Warm off-white background
          lightGray:  '#F5F5F5',
          midGray:    '#8A8A8A',
          darkGray:   '#4A4A4A',
          border:     '#E5E5E5',
          success:    '#2ECC71',
          whatsapp:   '#25D366',
        }
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero':  ['3.5rem', { lineHeight: '1.15', fontWeight: '700' }],
        'hero-sm': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        'content': '1280px',
      },
      boxShadow: {
        'card':     '0 2px 16px 0 rgba(0,0,0,0.08)',
        'card-hov': '0 8px 32px 0 rgba(0,0,0,0.14)',
        'nav':      '0 2px 20px 0 rgba(0,0,0,0.10)',
        'mega':     '0 16px 48px 0 rgba(0,0,0,0.12)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out both',
        'shimmer':    'shimmer 1.5s infinite linear',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #E8550A 0%, #F5A623 100%)',
        'gradient-dark':  'linear-gradient(180deg, rgba(28,28,46,0) 0%, rgba(28,28,46,0.85) 100%)',
      }
    },
  },
  plugins: [],
}
