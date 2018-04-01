/**
 * module dependencies for webpack dev configuration
 */
const path = require('path');
const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals');

// define paths
const nodeModulesPath = path.resolve(__dirname, '../node_modules');
const buildPath = path.resolve(__dirname, '../public', 'build');
const mainAppPath = path.resolve(__dirname, '../frontend', 'App', 'index.js');
const sharedStylesPath = path.resolve(__dirname, '../frontend', 'SharedStyles');
const componentsPath = path.resolve(__dirname, '../frontend', 'Components');
const containersPath = path.resolve(__dirname, '../frontend', 'Containers');
const viewsPath = path.resolve(__dirname, '../frontend', 'Views');

/**
 * webpack development configuration
 */
module.exports = {
  target  : 'web',
  // externals : [nodeExternals()],  // exclude stuff in node_modules
  devtool: 'inline-source-map',

  entry: [
    'webpack-hot-middleware/client',
    mainAppPath,
  ],

  output: {
    filename: 'bundle.js',
    path: buildPath,
    publicPath: '/build/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // { loader: 'react-hot-loader/webpack' },
          { loader: 'babel-loader' },
        ],
        exclude: [nodeModulesPath],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          // 'style-loader',
          // { loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
          { loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          // { loader: 'postcss-loader?sourceMap=inline' },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline'
            }
          },
        ],
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [ require('autoprefixer'), require('postcss-nesting') ],
      }
    }),
  ],

  resolve : {
    extensions: ['.js', '.css'],
    alias: {
      SharedStyles: sharedStylesPath,
      Components: componentsPath,
      Containers: containersPath,
      Views: viewsPath,
    },
  },
};
