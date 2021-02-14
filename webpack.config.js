const webpack = require('webpack');
const path = require('path');
const PATHS = {
  src: path.join(__dirname, 'src'),
};
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    watch: !isProduction,
    entry: ['./src/js/scrypt.js', './src/sass/style.scss'],
    output: {
        filename: 'main.js',
        path: path.join(__dirname, '/dist'),
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          }, {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
            ],
          }, {
            test: /\.(png|svg|jpe?g|gif)$/,
            loader: 'file-loader',
          }, {
            test: /\.html$/,
            loader: 'html-loader',
          },
        ]
      }, 
      plugins: [
        new CleanWebpackPlugin({
          patterns: [
            { from: `${PATHS.src}/assets/image`, to: `assets/image` },
            { from: `${PATHS.src}/assets/icons`, to: `assets/icons` },
          ],
        }),
        new CopyPlugin({
            patterns: [
              { from: './src/assets', to: 'assets' },
            ],
        }),
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'style.css'
        }),
      ]
  }
  
  return config;
};