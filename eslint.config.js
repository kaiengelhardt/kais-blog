import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import ts from 'typescript-eslint';

export default defineConfig(
  { ignores: ['dist/**', '.astro/**', '.husky/**', '.claude/**'] },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.astro'],
    extends: [ts.configs.recommended],
  },
  astro.configs.recommended,
  astro.configs['jsx-a11y-recommended'],
  {
    files: ['src/**/*.{js,mjs,ts,astro}', '**/*.astro/*.js'],
    languageOptions: { globals: globals.browser },
    settings: { 'jsx-a11y': { components: { Image: 'img' } } },
  },
  {
    files: ['*.{js,mjs}', 'scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
);
