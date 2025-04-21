import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import nextPlugin from '@next/eslint-plugin-next';

/**
 * A configuration for ESLint
 */
const config = [
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    // Ignore patterns
    {
        ignores: [
            '.now/*',
            '*.css',
            '.changeset',
            'dist',
            'esm/*',
            'public/*',
            'tests/*',
            'scripts/*',
            '*.config.js',
            '.DS_Store',
            'node_modules',
            'coverage',
            '.next',
            'build',
            '!.commitlintrc.cjs',
            '!.lintstagedrc.cjs',
            '!jest.config.js',
            '!plopfile.js',
            '!react-shim.js',
            '!tsup.config.ts',
        ],
    },
    // Global definitions
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 12,
                sourceType: 'module',
            },
            parser: tseslint.parser,
        },
    },
    // React plugin configuration
    {
        plugins: {
            react: reactPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/self-closing-comp': 'warn',
            'react/jsx-sort-props': [
                'warn',
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    noSortAlphabetically: false,
                    reservedFirst: true,
                },
            ],
        },
    },
    // React Hooks plugin configuration
    {
        plugins: {
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            'react-hooks/exhaustive-deps': 'off',
        },
    },
    // Next.js plugin configuration
    {
        plugins: {
            '@next/next': nextPlugin,
        },
    },
    // Prettier plugin configuration
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
        },
    },
    // General JavaScript rules
    {
        rules: {
            'no-console': 'warn',
            'padding-line-between-statements': [
                'warn',
                { blankLine: 'always', prev: '*', next: 'return' },
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                {
                    blankLine: 'any',
                    prev: ['const', 'let', 'var'],
                    next: ['const', 'let', 'var'],
                },
            ],
        },
    },
    // JSX A11y plugin configuration
    {
        plugins: {
            'jsx-a11y': jsxA11yPlugin,
        },
        rules: {
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/interactive-supports-focus': 'warn',
        },
    },
    // Import plugin configuration
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            'import/order': [
                'warn',
                {
                    groups: [
                        'type',
                        'builtin',
                        'object',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    pathGroups: [
                        {
                            pattern: '~/**',
                            group: 'external',
                            position: 'after',
                        },
                    ],
                    'newlines-between': 'always',
                },
            ],
        },
    },
    // Unused imports plugin configuration
    {
        plugins: {
            'unused-imports': unusedImportsPlugin,
        },
        rules: {
            'no-unused-vars': 'off',
            'unused-imports/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'after-used',
                    ignoreRestSiblings: false,
                    argsIgnorePattern: '^_.*?$',
                },
            ],
        },
    },
];

export default config;
