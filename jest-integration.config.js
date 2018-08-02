module.exports = {
    testMatch: [
        "<rootDir>/tests-integration/**/__tests__/**/*.ts?(x)",
        "<rootDir>/tests-integration/**/?(*.)(spec|test).ts?(x)"
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
    moduleFileExtensions: ["ts", "tsx", "js"]
};
