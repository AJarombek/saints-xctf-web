/**
 * Setup Jest for front-end React component unit tests.
 * @author Andrew Jarombek
 * @since 1/8/2020
 */

module.exports = {
  displayName: 'client',
  testEnvironment: 'jsdom',
  testMatch: ['**/client/**/*.test.js'],
  testURL: 'http://localhost/',
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  maxConcurrency: 5,
  moduleNameMapper: {
    '\\.(png|mp4)$': '../../test/client/mocks/fileMock.js'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/client/**/*.js'],
  coveragePathIgnorePatterns: ['src/client/index.js'],
  coverageThreshold: {
    'global': {
      'branches': 100,
      'functions': 100,
      'lines': 100,
      'statements': 100
    }
  },
};
