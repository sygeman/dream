const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
    webpack(config, options) {
      // Do not run type checking twice:
      if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
  
      config.resolve.modules.unshift(__dirname)
  
      return config
    },
  }, withCSS());