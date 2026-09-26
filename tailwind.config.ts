import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FAF8F4',
          100: '#F4F0E6',
          200: '#E9E3D3',
          300: '#DDD5BF',
          800: '#1C1B1A',
          900: '#131211',
          950: '#0C0B0A',
        },
        ink: {
          pure: '#080807',
          dark: '#141312',
          muted: '#635F59',
          light: '#9E998F',
          subtle: '#D1CBBF',
        },
        accent: {
          DEFAULT: '#D64527', // Burnt vermilion
          hover: '#BC381C',
          muted: '#E87D65',
          pale: '#FBECE8',
          dark: '#932813',
        },
      },
      fontFamily: {
        serif: ['var(--font-editorial)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Space Mono', 'monospace'],
        hand: ['var(--font-hand)', 'Caveat', 'Nanum Pen Script', 'cursive'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.18em',
        ultra: '0.28em',
      },
    },
  },
  plugins: [],
};
export default config;
