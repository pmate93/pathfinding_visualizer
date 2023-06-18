/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/comment-directive': 'error',
        semi: [2, 'always'],
        'vue/html-indent': ['error', 4],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
                FunctionDeclaration: { parameters: 'first' },
                FunctionExpression: { parameters: 'first' },
                CallExpression: { arguments: 'first' },
                ArrayExpression: 'first',
                ObjectExpression: 'first',
                ImportDeclaration: 'first',
                flatTernaryExpressions: false,
                ignoreComments: false,
                ignoredNodes: ['TemplateLiteral *'],
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 3,
                },
                multiline: {
                    max: 1,
                },
            },
        ],
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1 }],
        'no-multi-spaces': 'error',
        'keyword-spacing': 'error',
        'no-trailing-spaces': 'error',
        // 'vue/html-self-closing': 'error',
        // 'vue/singleline-html-element-content-newline': 'error',
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
        'vue/no-unused-vars': 'error',
        'vue/no-useless-template-attributes': 'warn',
        'vue/script-indent': ['error', 4, { baseIndent: 0, switchCase: 1 }],
        'vuejs-accessibility/alt-text': 'off',
        'vuejs-accessibility/anchor-has-content': 'off',
        'vuejs-accessibility/click-events-have-key-events': 'off',
        'vuejs-accessibility/form-control-has-label': 'off',
        'vuejs-accessibility/label-has-for': 'off',
        'vuejs-accessibility/mouse-events-have-key-events': 'off',
        '@typescript-eslint/indent': ['error'],
    },
    overrides: [
        {
            files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
            extends: ['plugin:cypress/recommended'],
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
};
