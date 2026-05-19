/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B5D3B',
        forest: '#063D2A',
        accent: '#16A34A',
        mint: '#EAF7F0',
        gold: '#C89B3C',
        charcoal: '#1F2933',
        muted: '#6B7280',
        light: '#F8FAFC',
        border: '#E5E7EB',
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgb(6 61 42 / 0.08)',
        card: '0 8px 30px -12px rgb(6 61 42 / 0.12)',
      },
    },
  },
  plugins: [],
}
