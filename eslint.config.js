import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tsFiles = ['**/*.ts', '**/*.mts', '**/*.cts'];

const typedBase = {
  files: tsFiles,
  languageOptions: {
    parser: tseslint.parser, // ⬅️ ensure TS parser
    parserOptions: {
      // EITHER use explicit project…
      project: [path.join(__dirname, 'tsconfig.json')],
      tsconfigRootDir: __dirname,

      // …OR use projectService: true (comment the two lines above if you prefer this)
      // projectService: true,
      // tsconfigRootDir: __dirname,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: { ...globals.node },
  },
};

// Keep recommended type-checked configs, but scope them to TS files
const typedRuleConfigs = tseslint.configs.recommendedTypeChecked.map((c) => ({
  ...c,
  files: tsFiles,
}));

export default [
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'vitest.config.ts'] },

  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  typedBase,
  ...typedRuleConfigs,

  eslintConfigPrettier,
];
