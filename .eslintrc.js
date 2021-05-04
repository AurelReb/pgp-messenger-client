module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
  },
  plugins: ['react', 'babel'],
  parser: '@babel/eslint-parser',
  rules: {
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'global-require': 'off',
    'no-param-reassign': 'off',
    'no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 0,
    'linebreak-style': ['error', 'unix'],
    'jsx-a11y/click-events-have-key-events': 'off',
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 'off',
    curly: 'off',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': 'off',
    // 'arrow-parens': ['error', 'as-needed'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
