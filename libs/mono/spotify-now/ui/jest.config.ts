/* eslint-disable */
module.exports = {
  displayName: 'mono-spotify-now-ui',

  transform: {
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { cwd: __dirname, configFile: './babel-jest.config.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/spotify-now/ui',
  preset: '../../../../jest.preset.ts',
};
