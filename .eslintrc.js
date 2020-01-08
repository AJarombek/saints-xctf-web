/**
 * Linting configuration for the SaintsXCTF Web Project.
 * @author Andrew Jarombek
 * @since 1/8/2020
 */

module.exports = {
    env: {
        browser: true,
        es2020: true,
        jest: true
    },
    extends: [
        'airbnb',
        'plugin:react/recommended'
    ],
    parser: "babel-eslint"
};
