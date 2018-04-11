const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configuration = require('./configuration.js');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.PUBLIC_PATH || '/dist/',
    filename: 'main.sentinelle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 5000,
    disableHostCheck: true,
  },
  devtool: 'sourcemap',
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: {
              loader: 'babel-loader',
            },
          },
        },
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: `"${process.env.NODE_ENV}"` },
      __CONFIGURATION: JSON.stringify(configuration),
    }),
    new HtmlWebpackPlugin({
      title: 'sentinelle',
      meta: {
        viewport: 'width=device-width, initial-scale=1',
      },
      favicon: path.resolve(__dirname, './src/assets/favicon.png'),
    }),
  ],
};
