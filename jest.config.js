module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    verbose: true,
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/server.ts", // Exclude server startup file
        "!src/types/**/*.ts", // Exclude type definitions
    ],
};