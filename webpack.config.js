
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/JS/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),  // Corrected the path
    filename: 'bundle.js',
  },
  watch: true,
  devtool: 'source-map',
  module: {}
};
