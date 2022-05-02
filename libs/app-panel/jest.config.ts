module.exports = {
  displayName: 'app-panel',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/app-panel',
  preset: '../../jest.preset.ts',
};
