import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * ESLint Configuration
 * This file defines the rules and standards for maintaining high code quality 
 * and consistency across the JavaScript and React files in the project.
 */
export default defineConfig([
  // Prevents the linter from checking the production build folder
  globalIgnores(['dist']),
  
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      // Incorporates industry-standard best practices for JavaScript and React hooks
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      /**
       * Ensures that all declared variables are utilized to prevent clutter.
       * Configured to allow specific naming patterns (like uppercase constants) 
       * to stay flexible for global definitions.
       */
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])