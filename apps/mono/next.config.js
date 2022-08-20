// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const path = require('path');

module.exports = withNx({
  experimental: {
    outputStandalone: true,
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
});
