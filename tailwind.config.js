module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#6441A4',
        surface: '#262841',
        background: '#1D1E31',
        accent: '#968A9D',
        text: '#EEEEEE',
      },
      height: {
        '32px': '32px',
      },
      width: {
        '32px': '32px',
        '72px': '72px',
        '240px': '240px',
        '320px': '320px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
