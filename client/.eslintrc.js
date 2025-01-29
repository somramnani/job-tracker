module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:testing-library/react",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "testing-library"],
  rules: {
    "testing-library/prefer-screen-queries": "off",
    "testing-library/no-container": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: ["*.playwright.js", "*.test.js"],
      rules: {
        "testing-library/prefer-screen-queries": "off",
        "testing-library/no-container": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
