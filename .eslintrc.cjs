/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  },
  "extends": [
    "next/core-web-vitals",
  ],
}
module.exports = config;