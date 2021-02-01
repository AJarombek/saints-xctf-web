/**
 * Setup Webpack for bundling JavaScript and Sass files.
 * @author Andrew Jarombek
 * @since 12/26/2019
 */

const path = require('path');
const glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require("webpack");

const parts = require('./webpack.parts');

const PATHS = {
  bundle: path.join(__dirname, 'src/index.tsx'),
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
          test: /\.ts(x?)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
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
              limit: 200000,
              name: 'assets/[name].[ext]'
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
        'process.env.NODE_ENV': env
      })
    ],
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },
    node: {
      fs: 'empty'
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
  devtool: "source-map",
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
      '/api/**': {
        target: 'http://localhost:5000/',
        secure: false,
        pathRewrite: { '^/api': '' }
      },
      '/auth/**': {
        target: 'http://localhost:5001/',
        secure: false,
        pathRewrite: { '^/auth': '' }
      },
      '/fn/**': {
        target: 'https://dev.fn.saintsxctf.com/',
        secure: true,
        changeOrigin: true,
        pathRewrite: { '^/fn': '' }
      },
      '/asset/**': {
        target: 'https://asset.saintsxctf.com/',
        secure: true,
        changeOrigin: true,
        pathRewrite: { '^/asset': '' }
      },
      '/uasset/**': {
        target: 'https://uasset.saintsxctf.com/dev/',
        secure: true,
        changeOrigin: true,
        pathRewrite: { '^/uasset': '' }
      }
    }
  }
};

module.exports = (env) => {
  switch (env) {
    case 'local':
      return merge(config(JSON.stringify(env), 'http://localhost:8090/'), localConfig);
    case 'development':
      return merge(config(JSON.stringify(env), '/'), devConfig);
    default:
      return merge(config(JSON.stringify(env), '/'), prodConfig);
  }
};
