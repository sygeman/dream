const commonConfig = {
  cdnUrl: 'https://cdn.pepega.com/',
  discordInvite: 'https://discord.gg/xVprhFC',
  yandexMetrikaId: 51879323
};

const devConfig = {
  apiUrl: 'http://localhost:3000/',
  gqlUrl: 'http://localhost:3000/graphql',
  wsgqlUrl: 'ws://localhost:3000/graphql',
  cookieOptions: {},
  twitchClientId: 'd3s8jbd7x97yf78bxx0q9bfbrjw7bt'
};

const prodConfig = {
  apiUrl: 'https://api.pepega.com/',
  gqlUrl: 'https://api.pepega.com/graphql',
  wsgqlUrl: 'wss://api.pepega.com/graphql',
  cookieOptions: {
    domain: '.pepega.com'
  },
  twitchClientId: 'gooocfjmqkdf6ollwhhymxkoci4b7x'
};

const isProduction = process.env.NODE_ENV === 'production';

export default { ...commonConfig, ...(isProduction ? prodConfig : devConfig) };
