module.exports = {
    collectCoverageFrom: ['**/*.js', '**/*.ts'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/lib/',
        '<rootDir>/scripts/',
        '<rootDir>/coverage/',
        '<rootDir>/support/',
        '<rootDir>/index.js',
        '<rootDir>/jest.config.js',
        '<rootDir>/server.local.js',
        '<rootDir>/example.ts',
    ],
    globalSetup: './__mocks__/environment.js',
    setupFilesAfterEnv: ['./__mocks__/setup.js'],
    testEnvironment: 'node',
};
