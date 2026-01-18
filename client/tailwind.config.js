/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A4B8C',
        secondary: '#FF6B35',
        accent: '#00C9A7',
        light: '#F5F7FA',
        dark: '#2D3748',
        gray: {
          400: '#718096',
          600: '#4A5568',
          800: '#2D3748',
        }
      },
    },
  },
  plugins: [],
}