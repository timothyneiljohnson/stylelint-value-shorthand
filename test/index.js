const ruleTester = require('stylelint-rule-tester');
const valueShorthand = require('..');

const messages = valueShorthand.messages;
const testRule = ruleTester(valueShorthand.rule, valueShorthand.ruleName);

const basics = (tr) => {
  tr.ok('');
  tr.ok('a {}');
  tr.ok('@import \'foo.css\';');
};

testRule(true, (tr) => {
  basics(tr);

  // Margin value

  // --- Valid
  tr.ok('a { margin: 0; }');
  tr.ok('a { margin: 0 8px; }');
  tr.ok('a { margin: 8px 10px 0; }');

  // --- Shorten to 1
  tr.notOk('a { margin: 0 0; }', '\'margin: 0 0\' should be written in shorthand as \'0\'');
  tr.notOk('a { margin: 0 0 0; }', '\'margin: 0 0 0\' should be written in shorthand as \'0\'');
  tr.notOk('a { margin: 0 0 0 0; }', '\'margin: 0 0 0 0\' should be written in shorthand as \'0\'');

  // --- Shorten to 2
  tr.notOk('a { margin: 0 8px 0; }', '\'margin: 0 8px 0\' should be written in shorthand as \'0 8px\'');
  tr.notOk('a { margin: 0 8px 0 8px; }', '\'margin: 0 8px 0 8px\' should be written in shorthand as \'0 8px\'');

  // --- Shorten to 3
  tr.notOk('a { margin: 10px 8px 0 8px; }', '\'margin: 10px 8px 0 8px\' should be written in shorthand as \'10px 8px 0\'');

  // Color value using variables

  // --- Valid
  tr.ok('a { border-color: $gray; }');
  tr.ok('a { border-color: $gray $blue; }');
  tr.ok('a { border-color: $blue $black $gray; }');

  // --- Shorten to 1
  tr.notOk('a { border-color: $gray $gray; }', '\'border-color: $gray $gray\' should be written in shorthand as \'$gray\'');
  tr.notOk('a { border-color: $gray $gray $gray; }', '\'border-color: $gray $gray $gray\' should be written in shorthand as \'$gray\'');
  tr.notOk('a { border-color: $gray $gray $gray $gray; }', '\'border-color: $gray $gray $gray $gray\' should be written in shorthand as \'$gray\'');

  // --- Shorten to 2
  tr.notOk('a { border-color: $gray $blue $gray; }', '\'border-color: $gray $blue $gray\' should be written in shorthand as \'$gray $blue\'');
  tr.notOk('a { border-color: $gray $blue $gray $blue; }', '\'border-color: $gray $blue $gray $blue\' should be written in shorthand as \'$gray $blue\'');

  // --- Shorten to 3
  tr.notOk('a { border-color: $black $blue $gray $blue; }', '\'border-color: $black $blue $gray $blue\' should be written in shorthand as \'$black $blue $gray\'');
});
