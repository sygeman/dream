const commonConfig = {
  emojiUrl: `https://ravepro.ams3.digitaloceanspaces.com/emojis/`,
  yandexMetrikaId: 51879323
};

const devConfig = {
  apiUrl: 'http://localhost:3000/',
  gqlUrl: 'http://localhost:3000/graphql',
  wsgqlUrl: 'ws://localhost:3000/graphql',
  cookieOptions: {}
};

const prodConfig = {
  apiUrl: 'https://api.twitchru.com/',
  gqlUrl: 'https://api.twitchru.com/graphql',
  wsgqlUrl: 'wss://api.twitchru.com/graphql',
  cookieOptions: {
    domain: '.twitchru.com'
  }
};

const isProduction = process.env.NODE_ENV === 'production';

export default { ...commonConfig, ...(isProduction ? prodConfig : devConfig) };
