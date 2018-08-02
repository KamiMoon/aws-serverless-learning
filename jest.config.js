module.exports = {
    collectCoverageFrom: ["src/**/*.{ts}"],
    setupFiles: ["<rootDir>/tests/setupTests.ts"],
    testMatch: [
        "<rootDir>/tests/**/__tests__/**/*.+(ts|tsx)",
        "<rootDir>/tests/**/?(*.)(spec|test).+(ts|tsx)"
    ],
    testEnvironment: "node",
    moduleNameMapper: {
        "src(.*)$": "<rootDir>/src/$1"
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.json"
        }
    },
    moduleFileExtensions: ["ts", "tsx", "js"],
    testEnvironment: "node"
};
