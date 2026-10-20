import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Architecture boundaries (see README): features don't import each other,
// and shared/ never depends on features/ or app/.
const noCrossFeature = {
  group: ["@/features/*", "@/app/*"],
  message:
    "Features are independent: use relative imports inside a feature, and move shared code to @/shared.",
};
const sharedStaysGeneric = {
  group: ["@/features/*", "@/app/*"],
  message: "shared/ must not depend on features/ or app/.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/features/**"],
    rules: { "no-restricted-imports": ["error", { patterns: [noCrossFeature] }] },
  },
  {
    files: ["src/shared/**"],
    rules: { "no-restricted-imports": ["error", { patterns: [sharedStaysGeneric] }] },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
