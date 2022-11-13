/* eslint-disable */
module.exports = {
  displayName: 'mono-mode-youtube-ui',

  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/mono/mode/youtube/ui',
  preset: '../../../../../jest.preset.ts',
};
