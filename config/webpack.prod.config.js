/**
 * module dependencies for webpack production configuration
 */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// define paths
const nodeModulesPath = path.resolve(__dirname, '../node_modules');
const buildPath = path.resolve(__dirname, '../public', 'build');
const mainAppPath = path.resolve(__dirname, '../frontend', 'App', 'index.js');
const sharedStylesPath = path.resolve(__dirname, '../frontend', 'SharedStyles');
const componentsPath = path.resolve(__dirname, '../frontend', 'Components');
const containersPath = path.resolve(__dirname, '../frontend', 'Containers');
const viewsPath = path.resolve(__dirname, '../frontend', 'Views');


/**
 * webpack production configuration
 */
module.exports = {
  target  : 'web',

  entry: [
    mainAppPath,
  ],

  output: {
    filename: 'bundle.js',
    path: buildPath,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' },
        ],
        exclude: [nodeModulesPath],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          { loader: 'less-loader' }
        ],
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },

  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [ autoprefixer]
      }
    })

  ],

  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      SharedStyles: sharedStylesPath,
      Components: componentsPath,
      Containers: containersPath,
      Views: viewsPath,
    },
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'redux': 'Redux',
    'react-router': 'ReactRouter',
    'moment': 'moment',
  },
};
