/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "bookly/(.*)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv:['<rootDir>/src/__test__/config/importJestDOM.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { "tsconfig": "./tsconfig.test.json" }],
  },
};