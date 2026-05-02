/* ESLint and Prettier configuration */
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist/*", "node_modules/*"],
  },
  {
    files: ["**/__tests__/**", "**/*.test.{ts,tsx}"],
    rules: {
      "react/display-name": "off",
    },
  },
]);
