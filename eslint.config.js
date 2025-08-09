import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },

  // JS files
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    ...js.configs.recommended,
  },

  // TS files (type-aware)
  ...tseslint.config(
    {
      files: ['**/*.ts', '**/*.mts', '**/*.cts'],
      languageOptions: {
        parserOptions: {
          // Type-aware rules without listing every tsconfig
          projectService: true,
          tsconfigRootDir: __dirname,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: { ...globals.node },
      },
    },
    ...tseslint.configs.recommendedTypeChecked,
    // Turn off formatting-related rules to let Prettier handle formatting
    eslintConfigPrettier,
  ),
];


