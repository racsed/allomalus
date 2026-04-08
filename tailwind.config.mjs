/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#059669', light: '#34D399', pale: '#F0FDF4', dark: '#047857', neon: '#00DC82' },
        accent: { DEFAULT: '#F59E0B', pale: '#FFFBEB' },
        ink: '#0A0A0A',
        surface: '#FAFAFA',
        border: '#E5E5E5',
        muted: '#737373',
        dark: '#111111',
      },
      fontFamily: {
        display: ['Satoshi', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.06)',
        lift: '0 8px 30px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
