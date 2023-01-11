/** Common configuration for webpack bundles **/

const path = require('path');
const appRootPath = require('app-root-dir').get();

module.exports = {
  outputPath: path.resolve(appRootPath),
  commonRules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
        },
      }],
    }
  ],
  commonPlugins: [],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }
};
