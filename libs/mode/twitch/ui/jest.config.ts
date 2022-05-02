module.exports = {
  displayName: 'mode-twitch-ui',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mode/twitch/ui',
  preset: '../../../../jest.preset.ts',
};
