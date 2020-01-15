/**
 * Webpack parts to be included in the main webpack.config.js file
 * @author Andrew Jarombek
 * @since 1/14/2020
 */

const webpack = require("webpack");

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
