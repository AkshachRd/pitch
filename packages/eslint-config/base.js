import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import pluginImport from "eslint-plugin-import";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      "import/order": ["warn",
        {
          groups: [
            "type",
            "builtin",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "~/**",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    plugins: {
      "unused-imports": pluginUnusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": "off",
    },
  },
  {
    plugins: {
      "jsx-a11y": pluginJsxA11y,
    },
    rules: {
      "jsx-a11y/interactive-supports-focus": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
    },
  },
  {
    rules: {
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", {
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_.*?$",
      }],
      "padding-line-between-statements": ["warn",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
    },
  },
  {
    ignores: ["dist/**"],
  },
];
