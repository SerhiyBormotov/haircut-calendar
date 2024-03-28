module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  root: true,
  extends: ["universe/native"],
  rules: {
    "import/order": [
      "warn",
      {
        groups: [],
      },
    ],
  },
};
