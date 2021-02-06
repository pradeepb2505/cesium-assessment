module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  standard: {
    env: ["mocha"],
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
};
