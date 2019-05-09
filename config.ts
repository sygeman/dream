const commonConfig = {
  cdnUrl: 'https://cdn.pepega.com/',
  discordInvite: 'https://discord.gg/xVprhFC',
  yandexMetrikaId: 51879323
};

const devConfig = {
  apiUrl: 'http://localhost:3000/',
  gqlUrl: 'http://localhost:3000/graphql',
  wsgqlUrl: 'ws://localhost:3000/graphql',
  cookieOptions: {}
};

const prodConfig = {
  apiUrl: 'https://api.pepega.com/',
  gqlUrl: 'https://api.pepega.com/graphql',
  wsgqlUrl: 'wss://api.pepega.com/graphql',
  cookieOptions: {
    domain: '.pepega.com'
  }
};

const isProduction = process.env.NODE_ENV === 'production';

export default { ...commonConfig, ...(isProduction ? prodConfig : devConfig) };
