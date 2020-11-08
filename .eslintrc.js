/**
 * Linting configuration for the SaintsXCTF Web Project.
 * @author Andrew Jarombek
 * @since 1/8/2020
 */

module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        "max-len": ["error", { "code": 120 }],
        "quotes": ["error", "single", { "avoidEscape": true }],
        "react/prop-types": ["off"],
        "react/no-unescaped-entities": ["off"]
    }
};
