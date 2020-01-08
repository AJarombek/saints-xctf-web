/**
 * Setup Jest for back-end Node.js/Express server tests.
 * @author Andrew Jarombek
 * @since 1/8/2020
 */

module.exports = {
    displayName: "server",
    testEnvironment: "node",
    testMatch: ["**/server/**/*.test.js"],
    maxConcurrency: 5,
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: ["src/server/**/*.js"],
    coveragePathIgnorePatterns: [],
    coverageThreshold: {
        "global": {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
        }
    },
};
