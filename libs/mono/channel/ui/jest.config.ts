/* eslint-disable */
module.exports = {
  displayName: 'mono-channel-ui',

  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/channel/ui',
  preset: '../../../../jest.preset.ts',
};
