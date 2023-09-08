/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'input-white': '#FFF',
        'lazy-gray': '#C0C1C5',
        'cooled-blue': '#76B7B1',
        'extra-white': '#EFF0EB',
        'wall-street': '#697279',
        'footer-icon': '#455154',
        'tricorn-black': '#2D2D2D',
      },
      fontFamily: {
        Cafe24Surround: ['Cafe24Surround'],
        Cafe24SurroundAir: ['Cafe24SurroundAir'],
        RixInooAriDuriR: ['RixInooAriDuriR'],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
};
