// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withTM = require('next-transpile-modules')(['three']);

module.exports = withTM(
  withNx({
    experimental: {
      esmExternals: false,
    },
  })
);
