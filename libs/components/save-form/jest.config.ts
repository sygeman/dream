module.exports = {
  displayName: 'components-save-form',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/components/save-form',
  preset: '../../../jest.preset.ts',
};
