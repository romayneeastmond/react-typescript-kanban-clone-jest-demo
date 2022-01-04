module.exports = {
    roots: [
        '<rootDir>/tests',
        '<rootDir>/src'
    ],
    transform: {
        '^.+\\.[t|j]sx?$': 'ts-jest'
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect'
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
    },
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/react-app-env.d.ts',
        '!src/reportWebVitals.ts',
        '!src/index.tsx'
    ],
    verbose: true
};