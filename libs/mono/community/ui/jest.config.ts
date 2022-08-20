/* eslint-disable */
module.exports = {
  displayName: 'mono-community-ui',

  transform: {
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      { cwd: __dirname, configFile: './babel-jest.config.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/community/ui',
  preset: '../../../../jest.preset.ts',
};
