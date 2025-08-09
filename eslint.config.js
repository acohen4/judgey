import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tsFiles = ['**/*.ts', '**/*.mts', '**/*.cts'];

// Base typed config for TS files only
const typedBase = {
  files: tsFiles,
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: { ...globals.node },
  },
};

// Apply recommended type-checked rules to TS files only
const typedRuleConfigs = tseslint.configs.recommendedTypeChecked.map((c) => ({
  ...c,
  files: tsFiles,
}));

export default [
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },

  // Global JS recommended rules
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  // TS files (type-aware)
  typedBase,
  ...typedRuleConfigs,

  // Turn off formatting-related rules to let Prettier handle formatting
  eslintConfigPrettier,
];
