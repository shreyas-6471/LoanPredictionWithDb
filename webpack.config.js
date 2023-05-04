const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "url": require.resolve("url/")
    }
  }
  
};
