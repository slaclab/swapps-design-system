import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    typecheck: {
      tsconfig: "./tsconfig.test.json",
    },
    css: false,
  },
});
