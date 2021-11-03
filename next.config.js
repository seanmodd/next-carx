// const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack5: false,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },

  // resolve: {
  //   plugins: [PnpWebpackPlugin],
  // },
  // resolveLoader: {
  //   plugins: [PnpWebpackPlugin.moduleLoader(module)],
  // },
};
