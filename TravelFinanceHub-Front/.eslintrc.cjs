module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'eslint-config-prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    "complexity": ["error", { "max": 20 }],
    'max-len': ['error', { 'code': 120 }],
    'max-lines': ['error', { 'max': 1500 }]
  },
  settings: {
    react: {
      version: "detect", // Añade esta línea para que ESLint detecte la versión de React
    },
  }
}
