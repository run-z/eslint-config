import eslint from '@eslint/js';
import prettierEslint from 'eslint-config-prettier';
import jestEslint from 'eslint-plugin-jest';
import globals from 'globals';
import { builtinModules } from 'node:module';
import { cwd } from 'node:process';
import tsEslint from 'typescript-eslint';

const jsFiles = ['**/*.js', '**/*.cjs', '**/*.mjs'];
const tsFiles = ['*.ts', '*.mts', '*.cts', '*.tsx'];
const testFiles = tsFiles.map(pattern => pattern.replace(/(.*)\.(\w+)$/, '$1.spec.$2'));
const variableNamePattern = '^[a-zA-Z][a-zA-Z0-9]*([_\\$][a-zA-Z0-9]+)*__[a-zA-Z0-9]+$';

export default [
  {
    ignores: ['dist/', 'node_modules/', 'target/'],
  },
  {
    files: [...jsFiles, ...tsFiles],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: restrictNodeBuiltinImports(),
          patterns: [
            {
              group: ['*/src', '*/src/**', '@*/*/src', '@*/*/src/**'],
              message: 'Import module rather than source file',
            },
            {
              group: [
                '*/dist',
                '*/dist/**',
                '@*/*/dist',
                '@*/*/dist/**',
                '../**/dist',
                '../**/dist/**',
              ],
              message: 'Import module rather than distribution bundle',
            },
          ],
        },
      ],
    },
  },
  {
    files: jsFiles,
    ...eslint.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
      },
    },
  },
  ...tsEslint.config({
    files: tsFiles,
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommendedTypeChecked,
      ...tsEslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: cwd(),
      },
    },
  }),
  {
    files: tsFiles,
    rules: {
      '@typescript-eslint/ban-types': [
        'error',
        {
          extendDefaults: true,
          types: {
            // Allow to use `object`
            object: false,
          },
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        // Allow `Name__symbol` variables
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          filter: {
            regex: variableNamePattern,
            match: false,
          },
        },
        {
          selector: 'variable',
          format: null,
          custom: {
            regex: variableNamePattern,
            match: true,
          },
        },
        // Allow quoted property names that require quoting to contain any characters
        {
          selector: ['objectLiteralProperty', 'objectLiteralMethod'],
          format: null,
          modifiers: ['requiresQuotes'],
        },
        {
          selector: ['objectLiteralProperty', 'typeProperty'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'memberLike',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          prefix: ['T'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/unified-signatures': 'error',
    },
  },
  ...tsEslint.config({
    files: testFiles,
    extends: [jestEslint.configs['flat/recommended'], jestEslint.configs['flat/style']],
    rules: {
      // '@typescript-eslint/no-unsafe-assignment': 'off',
      // '@typescript-eslint/no-unsafe-call': 'off',
      // '@typescript-eslint/no-unsafe-member-access': 'off',
      // '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'jest/unbound-method': 'error',
    },
    languageOptions: {
      globals: {},
    },
  }),
  prettierEslint,
];

function restrictNodeBuiltinImports() {
  return builtinModules
    .filter(name => !name.startsWith('node:'))
    .map(name => ({ name, message: `Import 'node:${name}' instead` }));
}
