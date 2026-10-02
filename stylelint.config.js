export default {
  extends: ['stylelint-config-standard'],
  overrides: [{ files: ['**/*.astro'], customSyntax: 'postcss-html' }],
  rules: {
    // Prettier owns whitespace; keep the standard CSS correctness and convention rules.
    'at-rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'declaration-empty-line-before': null,
    'rule-empty-line-before': null,
    // Component selectors are grouped together and target different elements.
    'no-descending-specificity': null,
  },
};
