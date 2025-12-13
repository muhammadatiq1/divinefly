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
          blue: '#005494',   // The new Main Logo Blue
          orange: '#FFAD00', // The dot color
          black: '#1a1a1a', 
          light: '#F8F9FA',  // Cleaner light gray background
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}