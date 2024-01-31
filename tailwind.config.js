/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'table-bg': '#121723',
        'table-header-color': '#89A6AC'
      }
    },
  },
  plugins: [],
}

