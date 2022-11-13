/* eslint-disable */
module.exports = {
  displayName: 'mono-components-modal-full',

  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/components/modal-full',
  preset: '../../../../jest.preset.ts',
};
