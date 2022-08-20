/* eslint-disable */
module.exports = {
  displayName: 'mono-mode-youtube-api',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/mono/mode/youtube/api',
  preset: '../../../../../jest.preset.ts',
};
