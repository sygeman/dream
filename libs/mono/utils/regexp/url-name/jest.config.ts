/* eslint-disable */
module.exports = {
  displayName: 'mono-utils-regexp-url-name',

  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../../coverage/libs/mono/utils/regexp/url-name',
  preset: '../../../../../jest.preset.ts',
};
