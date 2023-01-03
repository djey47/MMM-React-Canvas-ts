/** Common configuration for webpack bundles **/

const path = require('path');
const appRootPath = require('app-root-dir').get();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  outputPath: path.resolve(appRootPath),
  commonRules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: 'ts-loader',
    },
  ],
  commonPlugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts'],
  }
};
