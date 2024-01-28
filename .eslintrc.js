module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    // 'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    // "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "typeLike",
        "format": ["PascalCase"],
        "filter": {
          "regex": "(^i18n)",
          "match": false,
        }
      },
      {
        "selector": "function",
        "modifiers": ["global"],
        "format": ["PascalCase"],
        "filter": {
          "regex": "(^bootstrap$)|(^isUndefinedOrNull$)|(^nameof$)|(^unknownCase$)|(i18n)",
          "match": false,
        }
      },
      {
        "selector": "parameter",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I"],
        "filter": {
          "regex": "(^AbstractEntity$)|(^Array$)|(^Date$)|(^DateTime$)|(^EntityManager$)|(^Ii18n)|(^Number$)|(QueryBuilder$)|(^String$)",
          "match": false,
        }
      },
      {
        "selector": "typeParameter",
        "format": ["PascalCase"],
        "prefix": ["T"],
        "filter": {
          "regex": "(Entity)",
          "match": false,
        }
      },
      {
        "selector": "enumMember",
        "format": ["UPPER_CASE"],
        "filter": {
          "regex": "(i18n)",
          "match": false,
        }
      },
      {
        "selector": "classProperty",
        "modifiers": ["static"],
        "format": ["UPPER_CASE"],
      },
      {
        "selector": "variable",
        "modifiers": ["destructured"],
        "format": null
      },
    ],
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'vars': 'local',
        'args': 'after-used',
        'argsIgnorePattern': '^_',
      },
    ],
    "semi": "off",
    "@typescript-eslint/semi": ["error"],
    '@typescript-eslint/ban-ts-comment': 'error',
    'keyword-spacing': [
      'error',
      {
        'before': true,
        'after': true,
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'curly': ['error', 'all'],
    'semi-spacing': 'error',
    'arrow-spacing': 'error',
    'block-spacing': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['return', 'break', 'if'] },
      // { blankLine: "never", prev: "*", next: "block-like" },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'quotes': ['error', 'single'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': false }],
    'no-multi-spaces': 'error',
    'comma-spacing': [2, { 'before': false, 'after': true }],
    'key-spacing': ['error', { 'afterColon': true }],
    'object-curly-spacing': ['error', 'always'],
    'function-call-argument-newline': ['error', 'consistent'],
    'sort-imports': ['error', {
      'ignoreCase': true,
      'ignoreDeclarationSort': true,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
      'allowSeparatedGroups': false,
    }],
    'padded-blocks': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 0 }],
    'no-else-return': 'error',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        'default': {
          'memberTypes': [
            // Index signature
            'signature',

            'public-static-field',
            'protected-static-field',
            'private-static-field',
            'public-static-get',
            'protected-static-get',
            'private-static-get',

            // Fields
            'public-abstract-field',
            'protected-abstract-field',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',

            // Getters

            'public-abstract-get',
            'protected-abstract-get',

            'public-decorated-get',
            'protected-decorated-get',
            'private-decorated-get',

            'public-instance-get',
            'protected-instance-get',
            'private-instance-get',

            'public-get',
            'protected-get',
            'private-get',

            'static-get',
            'instance-get',
            'abstract-get',

            'decorated-get',

            'get',

            // Setters
            'public-static-set',
            'protected-static-set',
            'private-static-set',

            'public-abstract-set',
            'protected-abstract-set',

            'public-decorated-set',
            'protected-decorated-set',
            'private-decorated-set',

            'public-instance-set',
            'protected-instance-set',
            'private-instance-set',

            'public-set',
            'protected-set',
            'private-set',

            'static-set',
            'instance-set',
            'abstract-set',

            'decorated-set',

            'set',

            // Constructors
            'public-constructor',
            'protected-constructor',
            'private-constructor',

            // Methods
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            'public-abstract-method',
            'protected-abstract-method',
            'public-decorated-method',
            'protected-decorated-method',
            'private-decorated-method',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
          ],
          /* 'order': 'alphabetically-case-insensitive', */
        },
      },
    ],
  },
};
