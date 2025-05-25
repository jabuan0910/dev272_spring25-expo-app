// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "expo",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  ignorePatterns: ["/dist/*"],
  plugins: ["prettier", "react"],
  rules: {
    "prettier/prettier": "error",
    "import/no-unresolved": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    semi: ["error", "always"], // enforces semicolons
    quotes: ["error", "double"], // enforces single quotes
    "comma-dangle": ["error", "always-multiline"], // enforces trailing commas
  },
};
