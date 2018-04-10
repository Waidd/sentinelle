module.exports = {
  tourdeguet: {
    url: process.env.TOURDEGUET_URL || '//localhost:8081',
  },
  sentinelle: {
    publicPath: process.env.PUBLIC_PATH || '/dist',
  },
};
