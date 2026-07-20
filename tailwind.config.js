/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ml-blue': '#3B82F6',
        'ml-purple': '#8B5CF6',
        'ml-green': '#10B981',
        'ml-orange': '#F97316',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
        'glass-gradient-dark': 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))',
      }
    },
  },
  plugins: [],
}
