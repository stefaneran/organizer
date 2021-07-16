module.exports = {
  "testEnvironment": "jest-environment-jsdom",
  "moduleNameMapper": {
    "^app(.*)$": "<rootDir>/src/app$1",
    "^@core(.*)$": "<rootDir>/src/core$1",
    "^activities(.*)$": "<rootDir>/src/packages/activities$1",
    "^contacts(.*)$": "<rootDir>/src/packages/contacts$1",
    "^inventory(.*)$": "<rootDir>/src/packages/inventory$1",
    "^recipes(.*)$": "<rootDir>/src/packages/recipes$1"
  }
}