const { builtinModules } = require('node:module');

module.exports = {
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'array-bracket-newline': ['error', 'consistent'],
    'array-bracket-spacing': 'error',
    'array-element-newline': ['error', 'consistent'],
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    curly: ['error', 'all'],
    'dot-location': ['error', 'property'],
    'eol-last': 'error',
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'func-call-spacing': 'error',
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'consistent'],
    'generator-star-spacing': 'error',
    'implicit-arrow-linebreak': 'error',
    'key-spacing': 'error',
    'keyword-spacing': ['error', { before: true, after: true }],
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'multiline-ternary': ['error', 'always-multiline'],
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'no-extra-semi': 'error',
    'no-lonely-if': 'error',
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
      },
    ],
    'no-multi-str': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 0, maxEOF: 0 }],
    'no-restricted-imports': [
      'error',
      {
        paths: nodeBuiltins(),
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
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],
    'one-var': ['error', 'never'],
    'operator-linebreak': [
      'error',
      'before',
      {
        overrides: {
          '=': 'after',
          '*=': 'after',
          '**=': 'after',
          '/=': 'after',
          '%=': 'after',
          '+=': 'after',
          '-=': 'after',
          '<<=': 'after',
          '>>=': 'after',
          '>>>=': 'after',
          '&=': 'after',
          '^=': 'after',
          '|=': 'after',
          '&&=': 'after',
          '||=': 'after',
          '??=': 'after',
        },
      },
    ],
    'padded-blocks': [
      'error',
      {
        classes: 'always',
        switches: 'never',
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['break', 'continue', 'return'] },
      { blankLine: 'always', prev: ['break', 'continue', 'return'], next: '*' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: ['class', 'function'] },
    ],
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'quote-props': ['error', 'as-needed'],
    radix: 'error',
    'rest-spread-spacing': ['error', 'never'],
    semi: [
      'error',
      'always',
      {
        omitLastInOneLineBlock: false,
      },
    ],
    'semi-spacing': 'error',
    'semi-style': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': 'error',
    'space-infix-ops': ['error', { int32Hint: false }],
    'space-unary-ops': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          balanced: true,
          exceptions: ['#__PURE__', '#__INLINE__'],
        },
      },
    ],
    'switch-colon-spacing': 'error',
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error',
    'unicode-bom': 'error',
    'yield-star-spacing': 'error',
  },
  env: {
    es2017: true,
  },
};

function nodeBuiltins() {
  return builtinModules
    .filter(name => !name.startsWith('node:'))
    .map(name => ({ name, message: `Import 'node:${name}' instead` }));
}
