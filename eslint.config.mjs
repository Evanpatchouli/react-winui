import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "build/**",
      "coverage/**",
      "src/lib/dist/**",
      "examples/test-app/dist/**",
      "src/demo/**"
    ]
  },
  js.configs.recommended,
  {
    files: [
      "src/lib/src/**/*.{js,jsx}",
      "src/lib/src/**/*.{ts,tsx}",
      "apps/docs/**/*.{js,jsx}",
      "examples/test-app/**/*.{js,jsx}",
      "tests/**/*.{js,jsx}",
      "src/lib/vite.config.js",
      "src/lib/scripts/**/*.mjs",
      "vitest.config.js",
      "eslint.config.mjs"
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "no-case-declarations": "off",
      "no-console": "off",
      "no-constant-condition": "off",
      "no-prototype-builtins": "off",
      "no-redeclare": "off",
      "no-undef": "off",
      "no-unreachable": "warn",
      "no-unused-vars": "off",
      "no-useless-escape": "off",
      "react/display-name": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/no-unknown-property": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "error"
    }
  }
];
