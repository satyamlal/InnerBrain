import js from "@eslint/js";
import globals from "globals";
import parser from "@typescript-eslint/parser";
import pluginTs from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      "@typescript-eslint": pluginTs,
      react: pluginReact,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginTs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,

      // Ban @ts-ignore comments
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": true,
        },
      ],
    },
  },
]);
