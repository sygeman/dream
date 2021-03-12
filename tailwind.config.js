const Color = require('color');
const colors = require('tailwindcss/colors');
const lighen = (clr, val) => Color(clr).lighten(val).rgb().string();

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './apps/dream/layouts/**/*.{js,ts,jsx,tsx}',
      './apps/dream/pages/**/*.{js,ts,jsx,tsx}',
    ],
  },
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        twitch: {
          light: lighen('#6542a6', 0.2),
          DEFAULT: '#6542a6',
        },
        spotify: {
          light: lighen('#1a9c48', 0.2),
          DEFAULT: '#1a9c48',
        },
      },
      fontFamily: {
        sans: 'Roboto',
      },
    },
  },
};
