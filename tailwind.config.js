/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0B0D0F',
        gunmetal: '#1E2328',
        'gunmetal-light': '#252B31',
        chromium: '#7A8490',
        'chromium-light': '#9AA3AD',
        electric: '#00E5FF',
        'electric-dim': 'rgba(0, 229, 255, 0.15)',
        'electric-glow': 'rgba(0, 229, 255, 0.4)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Manrope', 'sans-serif'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'electric-pulse': 'electric-pulse 2s ease-in-out infinite',
        'orbit-slow': 'float-orbit 16s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'electric-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,229,255,0.4)' },
          '50%': { boxShadow: '0 0 0 8px transparent' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)`,
      },
    },
  },
  plugins: [],
};