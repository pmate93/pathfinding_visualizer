module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'prettier',
        /* "plugin:@typescript-eslint/eslint-recommended", */
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "vue-eslint-parser",
    parserOptions: {
        "parser": "@typescript-eslint/parser",
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/comment-directive': 'error',
        "semi": [2, "always"],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': ['error', {
            "singleline": {
                'max': 3
            },
            'multiline': {
                'max': 1
            },
        }],
        'no-multiple-empty-lines': ["error", { "max": 1, "maxBOF": 1 }],
        'no-multi-spaces': "error",
        'keyword-spacing': "error",
        'no-trailing-spaces': "error",
        'vue/html-self-closing': 'error',
        'vue/singleline-html-element-content-newline': 'error',
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
        "@typescript-eslint/indent": ["error"],
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
                '*.vue',
                '*.ts'
            ],
            env: {
                jest: true
            }
        }
    ]
};
