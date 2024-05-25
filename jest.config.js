module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/index.tsx',
      '!src/setupTests.ts',
    ],
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['text', 'lcov'],
  };
  