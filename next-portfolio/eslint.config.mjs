import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/weather/js/weather.js",
    // Vendored third-party code (minified Chart.js): not ours to lint
    "public/weather/js/*.min.js",
    "public/fx/**",
  ]),
]);

export default eslintConfig;
