module.exports = (config) => {
  if (config.optimization) config.optimization.minimize = false;
  return config;
};
