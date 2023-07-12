module.exports = {
  root: true,

  env: {
    browser: true,
  },

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint/eslint-plugin'],

  // Manually authored .d.ts files are generally used to describe external APIs that are not expected
  // to follow our coding conventions.  Linting those files tends to produce a lot of spurious suppressions,
  // so we simply ignore them.
  ignorePatterns: ['*.d.ts'],

  rules: {
    // allow unused params/vars when prefixed with '_'
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-namespace': 0,
  },
};
