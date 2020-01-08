/**
 * Setup Webpack for bundling JavaScript and Sass files.
 * @author Andrew Jarombek
 * @since 12/26/2019
 */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const webpack = require("webpack");

let ENV;
switch (process.env.NODE_ENV) {
    case 'local':
        ENV = 'local';
        break;
    case 'development':
        ENV = 'development';
        break;
    default:
        ENV = 'production';
}

const PATHS = {
    client: path.join(__dirname, 'src/client/index.js'),
    clientStyles: path.join(__dirname, 'src/client/index.scss'),
    clientBuild: path.join(__dirname, 'dist/client/'),
    server: path.join(__dirname, 'src/server/server.js'),
    serverBuild: path.join(__dirname, 'dist/server/')
};

const clientConfig = {
    entry: {
        scripts: PATHS.client,
        styles: PATHS.clientStyles
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.md$/,
                loader: "ignore-loader"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': ENV
        })
    ],
    output: {
        path: PATHS.clientBuild,
        filename: "[name].js"
    }
};

const clientProdConfig = {};
const clientDevConfig = {};
const clientLocalConfig = {};

const serverConfig = {};
const serverProdConfig = {};
const serverDevConfig = {};
const serverLocalConfig = {};

module.exports = (env) => {
    if (env === "clientProduction") {
        return merge(clientConfig, clientProdConfig);
    } else if (env === "serverProduction") {
        return merge(serverConfig, serverProdConfig);
    } else if (env === "clientDevelopment") {
        return merge(clientConfig, clientDevConfig);
    } else if (env === "serverDevelopment") {
        return merge(serverConfig, serverDevConfig);
    } else if (env === "clientLocal") {
        return merge(serverConfig, clientLocalConfig);
    } else if (env === "serverLocal") {
        return merge(serverConfig, serverLocalConfig);
    } else {
        return null;
    }
};
