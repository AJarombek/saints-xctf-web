/**
 * Setup Webpack for bundling JavaScript and Sass files.
 * @author Andrew Jarombek
 * @since 12/26/2019
 */

const path = require('path');
const glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  bundle: path.join(__dirname, 'src/index.js'),
  styles: glob.sync('./src/**/*.scss'),
  build: path.join(__dirname, 'dist/')
};

/**
 * [ALL ENV] Client Bundling Configuration
 */
const config = (env, publicPath) => merge([
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
      })
    ],
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath
    }
  },
  parts.mode(env),
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
    historyApiFallback: true,
    port: 8090,
    proxy: {
      '/api': 'http://localhost:8095'
    }
  }
};

module.exports = (env) => {
  switch (env) {
    case 'local':
      return merge(config(env, 'http://localhost:8090/'), localConfig);
    case 'development':
      return merge(config(env, 'https://dev.saintsxctf.com/'), devConfig);
    default:
      return merge(config(env, 'https://saintsxctf.com/'), prodConfig);
  }
};
