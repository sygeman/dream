const Color = require('color');
const lighen = (clr, val) => Color(clr).lighten(val).rgb().string();

const primary = '#b73c78';
const backgorud = '#0D1117';
const accent = '#adadb8';
const surface = '#161B22';
const twitch = '#6542a6';
const spotify = '#1a9c48';
const youtube = '#dc1b1b';

const colors = {
  primary: {
    DEFAULT: primary,
    light: lighen(primary, 0.2),
  },
  backgorud: {
    DEFAULT: backgorud,
    light: lighen(backgorud, 0.2),
  },
  accent: {
    DEFAULT: accent,
    light: lighen(accent, 0.4),
  },
  surface: {
    DEFAULT: surface,
    light: lighen(surface, 0.4),
  },
  twitch: {
    light: lighen(twitch, 0.2),
    DEFAULT: twitch,
  },
  spotify: {
    light: lighen(spotify, 0.2),
    DEFAULT: spotify,
  },
  youtube: {
    light: lighen(youtube, 0.2),
    DEFAULT: youtube,
  },
};

module.exports = {
  darkMode: 'media',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'apps/dream/pages/**/*.{js,ts,jsx,tsx}',
      'libs/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: Object.keys(colors).map((color) => new RegExp(`\-${color}`)),
    },
  },
  theme: {
    extend: {
      colors,
      fontFamily: false,
    },
  },
};
