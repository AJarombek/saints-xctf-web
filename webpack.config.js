/**
 * Setup Webpack for bundling JavaScript and Sass files.
 * @author Andrew Jarombek
 * @since 12/26/2019
 */

const path = require('path');
const glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const parts = require('./webpack.parts');

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);

let ENV, PUBLIC_PATH;
switch (process.env.NODE_ENV) {
  case 'local':
    ENV = 'local';
    PUBLIC_PATH = 'http://localhost:8090/';
    break;
  case 'development':
    ENV = 'development';
    PUBLIC_PATH = 'https://dev.saintsxctf.com/';
    break;
  default:
    ENV = 'production';
    PUBLIC_PATH = 'https://saintsxctf.com/';
}

const PATHS = {
  bundle: path.join(__dirname, 'src/index.js'),
  styles: glob.sync('./src/**/*.scss'),
  build: path.join(__dirname, 'dist/')
};

/**
 * [ALL ENV] Client Bundling Configuration
 */
const config = merge([
  {
    entry: {
      bundle: PATHS.bundle,
      styles: PATHS.styles
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader'
          }
        },
        {
          test: /\.(png|jpg|svg|gif|mp4)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 15000,
              name: '[name].[ext]'
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENV)
      })
    ],
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: PUBLIC_PATH
    }
  },
  parts.mode(ENV),
  parts.extractSass({
    useLoaders: ['css-loader', 'sass-loader']
  }),
  parts.markdownModule()
]);

const prodConfig = {};
const devConfig = {};

const localConfig = {
  resolve: {
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    historyApiFallback: true
  }
};

module.exports = (env) => {
  if (env === 'production') {
    return merge(config, prodConfig);
  } else if (env === 'development') {
    return merge(config, devConfig);
  } else if (env === 'local') {
    return merge(config, localConfig);
  } else {
    return null;
  }
};
