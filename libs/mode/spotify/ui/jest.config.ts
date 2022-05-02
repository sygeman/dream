module.exports = {
  displayName: 'mode-spotify-ui',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mode/spotify/ui',
  preset: '../../../../jest.preset.ts',
};
