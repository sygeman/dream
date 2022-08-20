/* eslint-disable */
module.exports = {
  displayName: 'mono-channel-settings-ui',

  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/channel-settings/ui',
  preset: '../../../../jest.preset.ts',
};
