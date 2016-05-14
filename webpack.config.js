const path = require('path');

module.exports = {
  entry: "./index.js",
  output: {
    path: path.join(__dirname, './dist'),
    filename: "index.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
