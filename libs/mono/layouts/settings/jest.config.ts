/* eslint-disable */
module.exports = {
  displayName: 'mono-layouts-settings',

  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/layouts/settings',
  preset: '../../../../jest.preset.ts',
};
