module.exports = {
  extends: "eslint:recommended",
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-unused-vars": "off",
    "no-console": "off",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@redux", "./src/redux"], // Adjust path based on your project structure
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
};
