const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintConfigPrettier = require('eslint-config-prettier')
const eslintPluginPrettier = require('eslint-plugin-prettier')
const jsdoc = require('eslint-plugin-jsdoc')

module.exports = defineConfig([
  expoConfig,
  eslintConfigPrettier,
  {
    ignores: [
      'dist/*',
      'node_modules/*',
      '.expo/*',
      'expo-env.d.ts',
      '.cursor/**',
      '.claude/**',
      '.agents/**',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '\\.\\./\\.\\./',
              message:
                'Two or more ../ levels: use an alias (@components, @theme, @/, …). A single ../ is allowed.',
            },
          ],
        },
      ],
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'no-inline-comments': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'LineComment',
          message: 'No line comments. JSDoc on reusable exports only.',
        },
        {
          selector:
            'MemberExpression[object.name="process"][property.name="env"]',
          message: 'Read environment variables from @env only.',
        },
      ],
    },
  },
  {
    files: ['src/common/components/**/index.tsx'],
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: false,
            MethodDefinition: false,
            ClassDeclaration: false,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
          contexts: [
            'VariableDeclarator[id.name=/^[A-Z].*/] > ArrowFunctionExpression',
            'VariableDeclarator[id.name=/^[A-Z].*/] > FunctionExpression',
          ],
        },
      ],
    },
  },
  {
    files: ['src/common/config/environment/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'LineComment',
          message: 'No line comments. JSDoc on reusable exports only.',
        },
      ],
    },
  },
])
