const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintConfigPrettier = require('eslint-config-prettier')
const eslintPluginPrettier = require('eslint-plugin-prettier')
const jsdoc = require('eslint-plugin-jsdoc')
const simpleImportSort = require('eslint-plugin-simple-import-sort')

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
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react$', '^react-native$', '^react-native-'],
            [
              '^expo',
              '^@expo',
              '^(?!@assets|@components|@views|@core|@theme|@device|@/)@?\\w',
            ],
            ['^@(assets|components|views|core|theme|device)(/.*)?$'],
            ['^@/'],
            ['^\\.\\./'],
            ['^\\./'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
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
          contexts: ['ExportDefaultDeclaration'],
        },
      ],
    },
  },
])
