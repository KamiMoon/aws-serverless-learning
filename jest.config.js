module.exports = {
    collectCoverageFrom: ["src/**/*.{js}"],
    setupFiles: ["<rootDir>/tests/setupTests.js"],
    testMatch: ["<rootDir>/tests/**/__tests__/**/*.js?(x)", "<rootDir>/tests/**/?(*.)(spec|test).js?(x)"],
    testEnvironment: "node",
    moduleNameMapper: {
        "src(.*)$": "<rootDir>/src/$1"
    }
};
