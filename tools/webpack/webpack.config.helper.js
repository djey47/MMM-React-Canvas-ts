/** Configuration for server-side webpack bundle **/

const { outputPath, commonRules, commonPlugins, resolve } = require('./webpack.config.common.js');

module.exports = {
  target: 'node',
  entry: './src/server/helper.ts',
  output: {
    filename: 'node_helper.js',
    path: outputPath,
    libraryTarget: 'umd',
  },
  externals: [ 'node_helper' ], // MM2 provided
  module: { 
    rules: [...commonRules],
  },
  plugins: [...commonPlugins],
  resolve,
};
