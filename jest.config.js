module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.test.tsx',
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.svg$": "jest-svg-transformer"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|other-es-lib))"]
};