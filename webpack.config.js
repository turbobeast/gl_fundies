var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    __dirname + '/src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'app.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: __dirname + '/views/index.html'
  })],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel']
    },
    {
      test: /\.glsl$/,
      loaders: ['shader']
    }]
  }
};
