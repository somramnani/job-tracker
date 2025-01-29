module.exports = {
  moduleNameMapper: { "^axios$": "axios/dist/node/axios.cjs" },
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: ["json", "lcov", "text"],
  setupFilesAfterEnv: ["./setupTest.js"],
  testPathIgnorePatterns: ["tests/e2e/"],
};
