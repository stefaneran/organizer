module.exports = {
  parser: "@typescript-eslint/parser", 
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    // "prettier/@typescript-eslint",
    // "plugin:prettier/recommended"
  ],
  rules: {
    // Turned off because many function don't need an explicit return type or argument types (too tedious)
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/prop-types": "off"
  }
};