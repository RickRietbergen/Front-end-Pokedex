/ @type {import('tailwindcss').Config} */;
module.exports = {
  content: ["./index.html", "./src//*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'flying-type': '#A890F0',
        'poison-type': '#A040A0',
        'fire-type': '#F08030',
        'grass-type': '#78C850',
        'water-type': '#6890F0',
        'bug-type': '#A8B820',
        'normal-type': '#A8A878',        
        'electric-type': '#F8D030',
        'ground-type':'#E0C068',
        'fairy-type':'#EE99AC',
        'psychic-type':'#F85888',
        'fighting-type': '#C03028',
        'rock-type': '#B8A038',
        'ghost-type': '#705898',
        'ice-type': '#98D8D8',
        'dragon-type': '#7038F8',
        'dark-type': '#705848',
        'steel-type': '#B8B8D0',
      }
    },
  },
  plugins: [],
};
