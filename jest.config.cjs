module.exports = {
  preset: "jest-expo",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["<rootDir>/app/**/*.(spec|test).(ts|tsx|js|jsx)"],
  setupFiles: ["<rootDir>/jest.setup.cjs"],
};