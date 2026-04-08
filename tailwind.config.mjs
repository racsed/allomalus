/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#10B981', light: '#34D399', pale: '#ECFDF5', dark: '#059669' },
        accent: { DEFAULT: '#F59E0B', pale: '#FFFBEB' },
        ink: '#0F172A',
        surface: '#F8FAFC',
        border: '#E2E8F0',
        muted: '#64748B',
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
