/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink-custom': 'rgba(255, 182, 193, 0.5)',
      },
      backdropFilter: { // Mengaktifkan efek blur transparan
        'none': 'none',
        'blur-lg': 'blur(10px)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-filters'), // Plugin untuk backdrop-filter
  ],
};