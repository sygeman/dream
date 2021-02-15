const Color = require('color');
const alpha = (clr, val) => Color(clr).alpha(val).rgb().string();
const lighen = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './apps/dream/layouts/**/*.{js,ts,jsx,tsx}',
      './apps/dream/pages/**/*.{js,ts,jsx,tsx}',
    ],
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: lighen('#6441A4', 0.2),
          DEFAULT: '#6441A4',
        },
        surface: {
          light: lighen('#262841', 0.2),
          DEFAULT: '#262841',
        },
        background: '#1D1E31',
        accent: '#968A9D',
        text: '#EEEEEE',
      },
      height: {
        '32px': '32px',
        '48px': '48px',
      },
      width: {
        '32px': '32px',
        '48px': '48px',
        '72px': '72px',
        '240px': '240px',
        '320px': '320px',
      },
      fontFamily: {
        sans: 'Roboto',
      },
      gridTemplateColumns: {
        'fill-240px': 'repeat(auto-fill, 240px)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
