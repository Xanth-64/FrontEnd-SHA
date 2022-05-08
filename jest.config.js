const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
    roots: ['<rootDir>'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    setupFiles: [],
    testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|.next)[/\\\\]'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
      url: 'http://localhost'
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testRegex: '/__tests__/.*\\.(test|spec)\\.tsx?$',
  };

module.exports = createJestConfig(customJestConfig)