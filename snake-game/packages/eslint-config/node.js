const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "turbo",
    "plugin:prettier/recommended",
  ],
  globals: {
    node: true,
    jest: true,
  },
  env: {
    node: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        tabWidth: 4,
        trailingComma: "all",
        singleQuote: false,
        arrowParens: "always",
        semi: true,
      },
    ],
  },
};
