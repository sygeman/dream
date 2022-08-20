/* eslint-disable */
module.exports = {
  displayName: 'mono-mode-twitch-api',

  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/mono/mode/twitch/api',
  preset: '../../../../../jest.preset.ts',
};
