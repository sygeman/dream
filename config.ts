const commonConfig = {
  sentryDsn: 'https://a264c8fe670545b88cfbdb41cd4819f0@sentry.io/1525960',
  cdnUrl: 'https://cdn.pepega.com/',
  discordInvite: 'https://discord.gg/xVprhFC'
};

const devConfig = {
  apiUrl: 'http://localhost:3000/',
  gqlUrl: 'http://localhost:3000/graphql',
  wsgqlUrl: 'ws://localhost:3000/graphql',
  defaultCommunityId: 'b80d3288-de5d-4250-9789-e5e84437e576',
  cookieOptions: {}
};

const prodConfig = {
  apiUrl: 'https://api.pepega.com/',
  gqlUrl: 'https://api.pepega.com/graphql',
  wsgqlUrl: 'wss://api.pepega.com/graphql',
  defaultCommunityId: '9b20808c-2e6b-493b-be8a-8133115a0771',
  cookieOptions: {
    domain: '.pepega.com'
  }
};

const isProduction = process.env.NODE_ENV === 'production';

export default { ...commonConfig, ...(isProduction ? prodConfig : devConfig) };
