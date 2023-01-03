/** Configuration for client-side webpack bundle **/

const { outputPath, commonRules, commonPlugins, resolve } = require('./webpack.config.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EditJsonFile = require('edit-json-file');
const appRootPath = require('app-root-dir').get();

const packageFile = EditJsonFile(`${appRootPath}/package.json`);

module.exports = {
  entry: './src/client/module.ts',
  output: {
    filename: `${packageFile.get('name')}.js`,
    path: outputPath,
  },
  module: {
    rules: [
      ...commonRules,
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }],
  },
  resolve,
  plugins: [
    ...commonPlugins,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.css',
      chunkFilename: '[id].css',
    }),
  ],
  // node: {
  //   // removes error when using fs in web environments, see https://github.com/webpack-contrib/css-loader/issues/447
  //   fs: 'empty',
  // },
};
