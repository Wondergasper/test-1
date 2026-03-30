/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F5F7F5',
        surface: '#FFFFFF',
        primary: '#1F3D2B',
        secondary: '#E8F0E9',
        accent: '#3DAA6B',
        text: '#0F1F0F',
        muted: '#6B7C6B',
        orange: '#E07B28',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '24px',
        xl: '40px',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(15,31,15,0.07)',
        card: '0 8px 32px rgba(15,31,15,0.10)',
        glow: '0 0 0 3px rgba(61,170,107,0.2)',
      },
      spacing: {
        18: '72px',
      }
    },
  },
  plugins: [],
}
