import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Define file patterns
    languageOptions: {
      globals: globals.browser, // Specify browser globals
    },
    ignores: [
      "node_modules/**",
      "dist/**", // Ignore common directories
    ],
    rules: {
      "no-unused-vars": "error", // Example rule
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended, // Spread array from TypeScript ESLint configs
];
