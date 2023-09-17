/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'input-white': '#FFF',
        'article-highly-liked': '#24736B',
        'article-img': '#2D2D2D',
        'profile-bg': '#EEF1F4',
        'lazy-gray': '#C0C1C5',
        'cooled-blue': '#76B7B1',
        'extra-white': '#EFF0EB',
        'wall-street': '#697279',
        'footer-icon': '#455154',
        'tricorn-black': '#2D2D2D',
        'error-red': '#CE395F',
        'light-violet': '#75609E',
        'tertiory-gray': '#9BA5B7',
        'primary-black': '#141619',
      },
      fontFamily: {
        Cafe24Surround: ['Cafe24Surround'],
        Cafe24SurroundAir: ['Cafe24SurroundAir'],
        Pretendard: ['Pretendard'],
      },
    },
    letterSpacing: {
      tighter: '-0.15rem',
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        mytheme: {
          'input-white': '#FFF',
          'article-highly-liked': '#24736B',
          'article-img': '#2D2D2D',
          'profile-bg': '#EEF1F4',
          'lazy-gray': '#C0C1C5',
          'cooled-blue': '#76B7B1',
          'extra-white': '#EFF0EB',
          'wall-street': '#697279',
          'footer-icon': '#455154',
          'tricorn-black': '#2D2D2D',
          'error-red': '#CE395F',
          'light-violet': '#75609E',
          'tertiory-gray': '#9BA5B7',
          'primary-black': '#141619',
        },
      },
    ],
  },
};
