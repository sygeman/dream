const Color = require('color');
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
        primary: {
          DEFAULT: '#b73c78',
          light: lighen('#b73c78', 0.2),
        },
        backgorud: '#1A212C',
        accent: {
          DEFAULT: '#adadb8',
          light: lighen('#adadb8', 0.4),
        },
        surface: {
          DEFAULT: '#242D3A',
          light: lighen('#242D3A', 0.4),
        },
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
