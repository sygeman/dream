/* eslint-disable */
module.exports = {
  displayName: 'mono-community-settings-ui',

  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/community-settings/ui',
  preset: '../../../../jest.preset.ts',
};
