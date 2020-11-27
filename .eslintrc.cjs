module.exports = {
  root: true,
  ignorePatterns: ['node_modules/'],
  extends: [
    './index.cjs',
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      env: {
        node: true,
      },
    },
  ],
};
