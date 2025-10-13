import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Semi-colon rule
      semi: ['warn', 'always'],

      // The last line should be empty
      'eol-last': ['warn', 'always'],

      // Quotes should be only single quotes
      quotes: ['warn', 'single', { allowTemplateLiterals: true }],

      // No need to import React
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
