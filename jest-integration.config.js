module.exports = {
    testMatch: [
        "<rootDir>/tests-integration/**/__tests__/**/*.js?(x)",
        "<rootDir>/tests-integration/**/?(*.)(spec|test).js?(x)"
    ],
    testEnvironment: "node",
    moduleNameMapper: {
        "src(.*)$": "<rootDir>/src/$1"
    }
};
