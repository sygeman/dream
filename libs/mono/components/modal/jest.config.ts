module.exports = {
  displayName: 'mono-components-modal',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mono/components/modal',
  preset: '../../../../jest.preset.ts',
};
