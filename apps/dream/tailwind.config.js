const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const Color = require('color');
const plugin = require('tailwindcss/plugin');
const lighen = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

const primary = '#597c3e';
const background = '#0D1117';
const accent = '#adadb8';
const surface = '#161B22';
const twitch = '#6542a6';
const spotify = '#1a9c48';
const youtube = '#dc1b1b';

const colors = {
  primary: {
    DEFAULT: primary,
    light: lighen(primary, 0.2),
    dark: darken(primary, 0.2),
  },
  background: {
    DEFAULT: background,
    light: lighen(background, 0.2),
  },
  accent: {
    DEFAULT: accent,
    light: lighen(accent, 0.4),
  },
  surface: {
    DEFAULT: surface,
    light: lighen(surface, 0.4),
    dark: darken(surface, 0.4),
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
  content: [
    join(__dirname, '/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors,
      fontFamily: false,
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addBase, addComponents, theme }) {
      addBase({
        body: {
          fontFamily: 'Roboto',
          overflow: 'hidden',
          color: theme('colors.white'),
          backgroundColor: theme('colors.surface.DEFAULT'),
          width: theme('width.full'),
          height: theme('height.screen'),
        },
        button: {
          '&:focus': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
          },
        },
        input: {
          border: 'none',
        },
        textarea: {
          border: 'none',
        },
        select: {
          fontSize: theme('fontSize.sm'),
          color: theme('colors.white'),
          padding: `${theme('spacing.1')} ${theme('spacing.10')} ${theme(
            'spacing.1'
          )} ${theme('spacing.3')}`,
          backgroundColor: theme('colors.background.DEFAULT'),
          border: 'none',
          borderRadius: theme('borderRadius.DEFAULT'),
        },
      });

      const buttons = {
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme('colors.white'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.medium'),
          borderRadius: theme('borderRadius.DEFAULT'),
          height: theme('height.8'),
          padding: `0 ${theme('spacing.3')}`,
          transitionProperty:
            'background-color, border-color, color, fill, stroke',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '75ms',
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
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          display: 'inline-flex',
          alignItems: 'center',
          width: theme('width.w-full'),
          position: 'relative',
          borderRadius: theme('borderRadius.DEFAULT'),
        },
      };

      ['twitch', 'spotify'].forEach((c) => {
        addComponents([
          {
            [`.btn-social-${c}`]: {
              backgroundColor: theme(`colors.${c}.DEFAULT`),
              '&:hover': {
                backgroundColor: theme(`colors.${c}.light`),
              },
            },
          },
        ]);
      });

      addComponents(buttons);
    }),
  ],
};
