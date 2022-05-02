module.exports = {
  displayName: 'modules-channel-settings-ui',

  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/modules/channel-settings/ui',
  preset: '../../../../jest.preset.ts',
};
