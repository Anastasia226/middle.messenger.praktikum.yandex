// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');
const path = require('path');
// eslint-disable-next-line import/extensions
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
  },
});
