# Run Z ESLint Configuration

[![NPM][npm-image]][npm-url]
[![Build Status][build-status-img]][build-status-link]
[![GitHub Project][github-image]][github-url]

Contains highly opinionated linting rules for TypeScript, JavaScript, and Jest.

Used in [Hatsy], [proc7ts], [run-z], and [Wesib] projects.

[npm-image]: https://img.shields.io/npm/v/@run-z/eslint-config.svg?logo=npm
[npm-url]: https://www.npmjs.com/package/@run-z/eslint-config
[build-status-img]: https://github.com/run-z/eslint-config/workflows/Build/badge.svg
[build-status-link]: https://github.com/run-z/eslint-config/actions?query=workflow:Build
[github-image]: https://img.shields.io/static/v1?logo=github&label=GitHub&message=project&color=informational
[github-url]: https://github.com/run-z/eslint-config
[hatsy]: https://github.com/hatsyjs
[proc7ts]: https://github.com/proc7ts
[run-z]: https://github.com/run-z
[wesib]: https://github.com/wesib

## Example Configuration

Add dependencies:

```shell
pnpm add -D eslint @run-z/eslint-config
```

Put the following to `eslint.config.js`:

```javascript
import configs from '@run-z/eslint-config';

export default configs;
```
