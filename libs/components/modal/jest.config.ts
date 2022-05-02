module.exports = {
  displayName: 'components-modal',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/components/modal',
  preset: '../../../jest.preset.ts',
};
