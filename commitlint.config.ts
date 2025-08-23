module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'ref', 'test']],
    'header-case': [2, 'always', 'sentence']
  }
};
