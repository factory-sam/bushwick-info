import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.ts",
    "data/**/*.ts",
    "e2e/**/*.ts",
  ],
  project: ["**/*.{ts,tsx}"],
  ignoreDependencies: [
    // Tailwind CSS v4 - used via PostCSS plugin, not direct import
    "tailwindcss",
    // ESLint config - used via extends in eslint.config.mjs
    "eslint-config-next",
    "@typescript-eslint/eslint-plugin",
    // Vitest coverage provider
    "@vitest/coverage-v8",
  ],
  next: {
    entry: ["app/**/*.{ts,tsx}", "next.config.ts"],
  },
};

export default config;
