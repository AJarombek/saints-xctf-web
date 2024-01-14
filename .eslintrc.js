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
    plugins: [
        "prettier",
        "react-hooks"
    ],
    rules: {
        "max-len": ["error", { "code": 120 }],
        "quotes": ["error", "single", { "avoidEscape": true }],
        "react/prop-types": ["off"],
        "react/no-unescaped-entities": ["off"],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "@typescript-eslint/camelcase": ["off"],
        "prettier/prettier": ["error", {
            "singleQuote": true,
            "printWidth": 120,
            "semi": true,
            "trailingComma": "all",
        }]
    },
    ignorePatterns: ['webpack.config.js', 'webpack.parts.js', 'jest.config.js']
};
