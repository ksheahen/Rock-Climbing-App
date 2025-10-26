import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

dotenv.config({ path: ".env" });

export default defineConfig({
  test: {
    globals: true, // makes describe, it, expect available globally
    environment: "jsdom", // use Node environment
    include: ["**/*.test.ts"], // ensure your test files are included
  },
});
