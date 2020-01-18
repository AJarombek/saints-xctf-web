/**
 * Setup Webpack for bundling JavaScript and Sass files.
 * @author Andrew Jarombek
 * @since 12/26/2019
 */

const path = require("path");
const glob = require("glob");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const webpack = require("webpack");

const parts = require("./webpack.parts");

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
    client: path.join(__dirname, 'src/client/index.js'),
    clientStyles: glob.sync('./src/**/*.scss'),
    clientBuild: path.join(__dirname, 'dist/'),
    server: path.join(__dirname, 'src/server/server.js'),
    serverBuild: path.join(__dirname, 'dist/')
};

/**
 * [ALL ENV] Client Bundling Configuration
 */
const clientConfig = merge([
    {
        entry: {
            client: PATHS.client,
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
                    test: /\.html$/,
                    use: {
                        loader: "html-loader"
                    }
                },
                {
                    test: /\.(png|jpg|svg|gif)$/,
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
                template: './src/client/index.html',
                filename: 'index.html'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(ENV)
            })
        ],
        output: {
            path: PATHS.clientBuild,
            filename: "[name].js",
            publicPath: PUBLIC_PATH
        }
    },
    parts.mode(ENV),
    parts.extractSass({
        useLoaders: ["css-loader", "sass-loader"]
    }),
    parts.markdownModule()
]);

const clientProdConfig = {};
const clientDevConfig = {};

const clientLocalConfig = {
    resolve: {
        alias: {
            'react': path.resolve('./node_modules/react'),
            'react-dom': '@hot-loader/react-dom'
        }
    }
};

/**
 * [ALL ENV] Server Bundling Configuration
 */
const serverConfig = merge([
    {
        entry: {
            server: PATHS.server
        },
        target: "node",
        node: {
            __dirname: false,
            __filename: false
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(ENV)
            })
        ],
        output: {
            path: PATHS.serverBuild,
            filename: '[name].js',
            publicPath: PUBLIC_PATH
        }
    },
    parts.mode(ENV),
    parts.markdownModule()
]);

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
        return merge(clientConfig, clientLocalConfig);
    } else if (env === "serverLocal") {
        return merge(serverConfig, serverLocalConfig);
    } else {
        return null;
    }
};
