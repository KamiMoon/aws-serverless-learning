module.exports = {
    testMatch: [
        "<rootDir>/integration_tests/**/__tests__/**/*.js?(x)",
        "<rootDir>/integration_tests/**/?(*.)(spec|test).js?(x)"
    ],
    testEnvironment: "node",
    moduleNameMapper: {
        "src(.*)$": "<rootDir>/src/$1"
    }
};
