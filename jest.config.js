module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@app\/(.*)$': '<rootDir>/src/$1'
  },
  setupFiles: ["<rootDir>/test/setup-tests.ts"]
};
