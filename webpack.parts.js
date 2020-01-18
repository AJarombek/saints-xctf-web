/**
 * Webpack parts to be included in the main webpack.config.js file
 * @author Andrew Jarombek
 * @since 1/14/2020
 */

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Ignore Markdown (.md) files from the bundling process.
 * @return {{module: {rules: *[]}}}
 */
exports.markdownModule = () => ({
    module: {
        rules: [
            {
                test: /\.md$/,
                loader: "ignore-loader"
            }
        ]
    }
});

/**
 * Set the mode of the webpack build.  Setting the mode will apply certain built-in optimizations.
 * https://webpack.js.org/configuration/mode/
 * @param env The environment passed to the --env command line argument.
 * @return {{mode: string}}
 */
exports.mode = (env) => ({
    mode: env === 'production' ? 'production': 'development'
});

/**
 * Extract the Sass from being inlined with the JavaScript.  This Webpack config is used to
 * generate a separate CSS bundle.
 * Source: https://survivejs.com/webpack/styling/separating-css/
 * @param include - files to whitelist for use of these loaders
 * @param exclude - files to blacklist from these loaders
 * @param useLoaders - specify which loaders to use
 * @returns {{module: {rules: *[]}, plugins: *}}
 */
exports.extractSass = ({include, exclude, useLoaders}) => {
    /* You are a wonderful person. */
    const plugin = new MiniCssExtractPlugin({
        filename: '[name].css'
    });

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include,
                    exclude,
                    use: [MiniCssExtractPlugin.loader].concat(useLoaders)
                }
            ]
        },
        plugins: [plugin]
    };
};
