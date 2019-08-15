module.exports = {
  'extends': [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:jest/all',
  ],
  'plugins': [
    'react',
    'prettier',
    'jsx-a11y',
    'react-hooks',
  ],
  'rules': {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'func-names': [
      'error',
      'never',
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'semi': [
      'error',
      'always',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': ['.js', 'jsx'],
      },
    ],
    'prettier/prettier': 'error',
    'max-len': ['error', 100],
  },
  'env': {
    'amd': true,
    'browser': true,
    'es6': true,
    'node': true,
  },
};