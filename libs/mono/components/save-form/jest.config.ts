/* eslint-disable */
module.exports = {
  displayName: 'mono-components-save-form',

  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/components/save-form',
  preset: '../../../../jest.preset.ts',
};
