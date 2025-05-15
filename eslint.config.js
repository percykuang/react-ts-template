const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    ignores: [
      'dist/**',
      'build/**',
      'scripts/**',
      'plugins/**',
      'node_modules/**',
      'coverage/**',
      '.vscode/**',
      '**/*.d.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': typescriptEslintPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // 变量相关规则
      'no-unused-vars': 'off',
      'no-var': 'error', // 禁止使用var

      // React相关规则
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      // React Hooks相关规则
      'react-hooks/rules-of-hooks': 'error', // 检查Hooks规则
      'react-hooks/exhaustive-deps': 'warn', // 检查依赖项

      // 自定义规则：检查useState的setter是否被使用
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_', // 允许使用_开头的变量名来忽略
        },
      ],

      // 函数相关规则
      'func-style': ['error', 'expression'], // 强制使用函数表达式（箭头函数）
      'arrow-body-style': ['error', 'as-needed'], // 箭头函数体风格
      'max-params': ['error', 3], // 限制函数参数数量不超过3个

      // TypeScript 相关规则
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // 强制使用 import type 导入类型
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],

      // 其他规则
      'prettier/prettier': 'error',
    },
  },
];
