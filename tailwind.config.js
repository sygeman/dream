module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#6441A4',
        surface: '#262841',
        surface: {
          light: '#2d2f4d',
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
