// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    "node": true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  globals: {
  },
  // add your custom rules here
  rules: {
    'comma-dangle': 2,
    'quotes': [1, 'single'],
    // 'no-new': 0,
    'global-strict': 0,
    'no-unused-expressions': 0,
    'no-undef': 0,
    'prefer-promise-reject-errors': 0,
    'semi': [1, 'always'],
    'no-extra-semi': 1,
    'no-unused-vars': 0,
    // 'yoda': 0,
    'no-mixed-spaces-and-tabs': 2,
    'curly': [1],
    'indent': [0, 4, { 'SwitchCase': 1 }],
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-trailing-spaces': [1, { 'skipBlankLines': true }],
    'no-unreachable': 1,
    'no-alert': 0,
    'one-var': 0,
    'linebreak-style': [2, 'unix'],
    // allow async-await
    'generator-star-spacing': 'off',
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
