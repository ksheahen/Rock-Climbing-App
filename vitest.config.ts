import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // makes describe, it, expect available globally
    environment: "node", // use Node environment
    include: ["**/*.test.ts"], // ensure your test files are included
  },
});
