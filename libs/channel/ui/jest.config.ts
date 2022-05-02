module.exports = {
  displayName: 'channel-ui',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/channel/ui',
  preset: '../../../jest.preset.ts',
};
