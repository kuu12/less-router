module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
    ],
    extends: [
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        // 'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn', {
            varsIgnorePattern: '[iI]gnored|React',
            argsIgnorePattern: '[iI]gnored'
        }],
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
        '@typescript-eslint/camelcase': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-var': 0,
        'import/order': ['warn', {
            groups: [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'index',
            ]
        }],
    }
};