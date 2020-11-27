Run Z ESLint Configuration
==========================

[![NPM][npm-image]][npm-url]
[![GitHub Project][github-image]][github-url]

Contains highly opinionated rules for TypeScript, JavaScript, and Jest.

Used in [Hatsy], [proc7ts], [run-z], and [Wesib] projects.

[npm-image]: https://img.shields.io/npm/v/@run-z/exec-z.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/@run-z/exec-z
[github-image]: https://img.shields.io/static/v1?logo=github&label=GitHub&message=project&color=informational
[github-url]: https://github.com/run-z/exec-z

[Hatsy]: https://github.com/hatsyjs
[proc7ts] https://github.com/proc7ts
[run-z]: https://github.com/run-z
[Wesib]: https://github.com/wesib


Example Configuration
---------------------

Put the following to `.eslint.cjs`:

```javascript
module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', 'dist/', 'target/', 'd.ts/', '*.d.ts'],
  extends: [
    '@run-z',
  ],
  overrides: [
    // JavaScript
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      env: {
        node: true,
      },
    },
    // TypeScript
    {
      files: ['*.ts'],
      extends: [
        '@run-z/eslint-config/typescript',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      env: {
        browser: true,
      },
    },
    // Tests (Jest-driven)
    {
      files: ['*.spec.ts'],
      extends: [
        '@run-z/eslint-config/jest',
      ],
      parserOptions: {
        // Dedicated TypeScript configuration for tests
        project: './tsconfig.spec.json',
      },
    },
  ],
};
```
