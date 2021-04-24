const Color = require('color');
const plugin = require('tailwindcss/plugin');
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
  mode: 'jit',
  darkMode: 'media',
  purge: {
    // enabled: process.env.NODE_ENV === 'production',
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
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        body: {
          fontFamily: 'Roboto',
          overflow: 'hidden',
          backgroundColor: theme('colors.surface.DEFAULT'),
          width: theme('width.screen'),
          height: theme('width.screen'),
        },
        input: {
          border: 'none',
        },
        textarea: {
          border: 'none',
        },
        '.btn': {
          color: theme('colors.white'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.medium'),
          backgroundColor: theme('colors.surface.DEFAULT'),
          borderRadius: theme('borderRadius.DEFAULT'),
          padding: `${theme('spacing[1.5]')} ${theme('spacing.3')}`,
          '&:hover': {
            backgroundColor: theme('colors.surface.light'),
          },
        },
        '.btn-primary': {
          backgroundColor: theme('colors.primary.DEFAULT'),
          '&:hover': {
            backgroundColor: theme('colors.primary.light'),
          },
        },
        '.btn-social': {
          fontWeight: theme('fontWeight.medium'),
          margin: `${theme('spacing.1')} 0`,
          padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
          display: 'inline-flex',
          alignItems: 'center',
          width: theme('width.w-full'),
          position: 'relative',
          borderRadius: theme('borderRadius.DEFAULT'),
        },
        '.btn-social-twitch': {
          backgroundColor: theme('colors.twitch.DEFAULT'),
          '&:hover': {
            backgroundColor: theme('colors.twitch.light'),
          },
        },
        '.btn-social-spotify': {
          backgroundColor: theme('colors.spotify.DEFAULT'),
          '&:hover': {
            backgroundColor: theme('colors.spotify.light'),
          },
        },
      });
    }),
  ],
};
