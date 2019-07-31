const webpack = require('webpack');

module.exports = {
  mode: 'development',
  target: 'web',
  node: {
      fs: 'empty'
  },
  entry: {
    app: '',
  },
  output: {
    path: '',
    filename: '',
    publicPath: '',
  },
  module: {

  },
  plugins: [],
  optimization: {},
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};
 