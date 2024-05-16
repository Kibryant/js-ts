module.exports = {
    env: {
        es2021: true,
        jest: true,
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "next/core-web-vitals",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "no-useless-constructor": "off",
        "no-non-null-assertion": "off",
        "prettier/prettier": [
            "error",
            {
                printWidth: 120,
                tabWidth: 4,
                singleQuote: true,
                trailingComma: "all",
                arrowParens: "always",
                semi: true,
            },
        ],
    },
    settings: {
        "import/parsers": {
            [require.resolve("@typescript-eslint/parser")]: [
                ".ts",
                ".tsx",
                ".d.ts",
            ],
        },
    },
};
