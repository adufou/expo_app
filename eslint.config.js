import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactNativePlugin from 'eslint-plugin-react-native'
import vitestPlugin from '@vitest/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'

/* global URL */

// Custom rule for path alias enforcement (imports, exports, dynamic imports)
const enforcePathAliasRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce using @ path alias instead of relative paths',
      category: 'Best Practices',
    },
    fixable: 'code',
  },
  create(context) {
    const filePath = context.filename
    const normalizedFilePath = filePath.replace(/\\/g, '/')

    if (!normalizedFilePath.includes('/src/')) {
      return {}
    }

    const fileDir = normalizedFilePath.substring(0, normalizedFilePath.lastIndexOf('/'))
    const srcIndex = fileDir.indexOf('/src/')

    const checkPath = (node, sourceNode) => {
      if (!sourceNode || typeof sourceNode.value !== 'string') return
      const importPath = sourceNode.value
      if (importPath.startsWith('..') || importPath.startsWith('./')) {
        if (srcIndex !== -1) {
          const resolvedPath = new URL(importPath, `file://${fileDir}/`).pathname
          const srcPathIndex = resolvedPath.indexOf('/src/')
          if (srcPathIndex !== -1) {
            const srcPath = resolvedPath.substring(srcPathIndex + 5)
            const aliasPath = `@/${srcPath}`
            context.report({
              node,
              message: `Use '@' alias instead of relative path: replace '${importPath}' with '${aliasPath}'`,
              fix(fixer) {
                return fixer.replaceText(sourceNode, `'${aliasPath}'`)
              },
            })
          }
        }
      }
    }

    return {
      // Static imports: import X from './path'
      ImportDeclaration(node) {
        checkPath(node, node.source)
      },
      // Named exports: export { X } from './path'
      ExportNamedDeclaration(node) {
        if (node.source) checkPath(node, node.source)
      },
      // Export all: export * from './path'
      ExportAllDeclaration(node) {
        checkPath(node, node.source)
      },
      // Dynamic imports: import('./path') or () => import('./path')
      ImportExpression(node) {
        checkPath(node, node.source)
      },
    }
  },
}

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.expo/**',
      '**/android/**',
      '**/ios/**',
      '**/coverage/**',
      'babel.config.cjs',
      'metro.config.js',
    ],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // React recommended rules
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      // React 17+ JSX transform doesn't require React in scope
      'react/react-in-jsx-scope': 'off',
    },
  },

  // React Hooks rules
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // React Native rules (strict - all as errors)
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-native': reactNativePlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'error',
      'react-native/no-color-literals': 'error',
      'react-native/no-raw-text': 'error',
      'react-native/no-single-element-style-arrays': 'error',
      'react-native/split-platform-components': 'error',
    },
  },

  // Vitest rules for test files
  {
    files: ['src/**/__tests__/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      'vitest/consistent-test-filename': [
        'error',
        {
          pattern: '.*\\.test\\.ts(x)?$',
          allTestPattern: '.*\\.test\\.ts(x)?$',
        },
      ],
      'vitest/no-conditional-in-test': 'error',
    },
  },

  // Restrict vitest imports to test files only
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: [
      'src/**/__tests__/**/*.test.{ts,tsx}',
      'src/**/*.test.{ts,tsx}',
      'src/**/__mocks__/**/*.ts',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'vitest',
              message: 'Vitest imports are only allowed in test files (*.test.ts, *.test.tsx).',
            },
          ],
        },
      ],
    },
  },

  // Path alias enforcement
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'path-alias': {
        rules: {
          'enforce-at-alias': enforcePathAliasRule,
        },
      },
    },
    rules: {
      'path-alias/enforce-at-alias': 'error',
    },
  },

  // TypeScript strict rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      eqeqeq: ['error', 'always'],
    },
  },

  // Disable rules that conflict with Prettier
  eslintConfigPrettier,
)
