/**
 * Setup Jest for front-end React component unit tests.
 * @author Andrew Jarombek
 * @since 1/8/2020
 */

module.exports = {
  displayName: 'client',
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.test.js', '**/test/**/*.test.ts'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    }
  },
  testURL: 'http://localhost/',
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  maxConcurrency: 5,
  moduleNameMapper: {
    '\\.(png|mp4)$': '<rootDir>/test/mocks/fileMock.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'],
  coveragePathIgnorePatterns: ['src/index.js'],
  coverageThreshold: {
    'global': {
      'branches': 100,
      'functions': 100,
      'lines': 100,
      'statements': 100
    }
  },
};
