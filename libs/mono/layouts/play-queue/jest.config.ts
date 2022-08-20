/* eslint-disable */
module.exports = {
  displayName: 'mono-layouts-play-queue',

  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/layouts/play-queue',
  preset: '../../../../jest.preset.ts',
};
