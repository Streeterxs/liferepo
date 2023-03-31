const { eslintNode } = require('@liferepo/eslint');

module.exports = {
  ...eslintNode,
  rules: {
    ...eslintNode.rules,
  },
};
