const path = require('path');

const devConfig = {
  apiUrl: 'http://localhost:3000/',
  gqlUrl: 'http://localhost:3000/graphql',
  gqlSSRUrl: 'http://localhost:3000/graphql',
  wsgqlUrl: 'ws://localhost:3000/graphql',
  defaultCommunityId: 'b80d3288-de5d-4250-9789-e5e84437e576',
  cookieOptions: {}
};

const prodConfig = {
  apiUrl: 'https://api.pepega.com/',
  gqlUrl: 'https://api.pepega.com/graphql',
  gqlSSRUrl: 'https://api.pepega.com/graphql',
  wsgqlUrl: 'wss://api.pepega.com/graphql',
  defaultCommunityId: '9b20808c-2e6b-493b-be8a-8133115a0771',
  cookieOptions: {
    domain: '.pepega.com'
  }
};

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // Will only be available on the server side
  serverRuntimeConfig: {},
  // Will be available on both server and client
  publicRuntimeConfig: {
    cdnUrl: 'https://cdn.pepega.com/',
    discordInvite: 'https://discord.gg/xVprhFC',
    ...(isProduction ? prodConfig : devConfig)
  },
  webpack(config, _options) {
    config.resolve.alias['src'] = path.join(__dirname, 'src');
    return config;
  }
};
