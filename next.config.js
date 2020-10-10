/* eslint-disable functional/immutable-data */

module.exports = {
  webpack: (config) => {
    config.externals = config.externals || {};
    config.externals['styletron-server'] = 'styletron-server';
    return config;
  },
};
