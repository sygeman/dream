/* eslint-disable */
module.exports = {
  displayName: 'mono-mode-twitch-ui',

  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/mono/mode/twitch/ui',
  preset: '../../../../../jest.preset.ts',
};
