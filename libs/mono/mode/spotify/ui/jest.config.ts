/* eslint-disable */
module.exports = {
  displayName: 'mono-mode-spotify-ui',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/mono/mode/spotify/ui',
  preset: '../../../../../jest.preset.ts',
};
