/* eslint-disable */
module.exports = {
  displayName: 'mono-channel-ui',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/channel/ui',
  preset: '../../../../jest.preset.ts',
};
