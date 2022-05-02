module.exports = {
  displayName: 'components-modal-full',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/components/modal-full',
  preset: '../../../jest.preset.ts',
};
