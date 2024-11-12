/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "var(--red1)",
        gris: "var(--gris)",
      },
      backgroundImage: {
        'fond': 'linear-gradient(183deg, rgba(50,50,50,1) -50%, rgba(0,0,0,1) 100%)',
      },
      
    },
  },
  plugins: [],
}

