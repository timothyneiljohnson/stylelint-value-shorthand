const assign = require('object-assign');
const stylelint = require('stylelint');
const ruleName = 'value-shorthand';
const messages = stylelint.utils.ruleMessages(ruleName, {});

const arrayContains = (searchItem, array) =>
  array.indexOf(searchItem) > -1;

const shorthandProperties = [
  'border-color',
  'border-radius',
  'border-style',
  'border-width',
  'margin',
  'padding'
];

module.exports = stylelint.createPlugin(ruleName, (actual) =>
  (root, result) => {
    // Check if prop is able to be shorthanded
    const checkShorthandProperty = (decl) => {
      if (arrayContains(decl.prop, shorthandProperties)) {
        checkShorthandValue(decl);
      }
    };

    // Check if value is able to be shorthanded
    const checkShorthandValue = (decl) => {
      const value = decl.value.replace('!important', '').trim();
      const valuesArray = value.split(' ');
      const trimmedValue = valuesArray.join(' ');
      const top = valuesArray[0];
      const right = valuesArray[1];
      const bottom = valuesArray[2];
      const left = valuesArray[3];
      const shorthand = getShorthand(top, right, bottom, left);

      if (trimmedValue !== shorthand) {
        stylelint.utils.report({
          ruleName: ruleName,
          result: result,
          node: decl,
          message: `'${decl.prop}: ${value}' should be written in shorthand as '${shorthand}'`
        });
      }
    };

    const getShorthand = (top, right, bottom, left) => {
      var value;
      if (shortenToOneValue(top, right, bottom, left)) {
        value = top;
      } else if (shortenToTwoValues(top, right, bottom, left)) {
        value = `${top} ${right}`;
      } else if (shortenToThreeValues(top, right, bottom, left)) {
        value = `${top} ${right} ${bottom}`;
      } else {
        value = `${top} ${right} ${bottom} ${left}`;
      }
      return value;
    };

    const shortenToOneValue = (top, right, bottom, left) =>
      (top && typeof right === 'undefined' && typeof bottom === 'undefined' && typeof left === 'undefined') || // 0
      (top === right && typeof bottom === 'undefined' && typeof left === 'undefined') || // 0 0
      (top === right && top === bottom && typeof left === 'undefined') || // 0 0 0
      (top === right && top === bottom && top === left); // 0 0 0 0

    const shortenToTwoValues = (top, right, bottom, left) =>
      (top && right && typeof bottom === 'undefined' && typeof left === 'undefined') || // 0 8px
      (top === bottom && typeof left === 'undefined') || // 0 8px 0
      (top === bottom && right === left); // 0 8px 0 8px

    const shortenToThreeValues = (top, right, bottom, left) =>
      right === left || // 10px 8px 0 8px
      (top && right && bottom && typeof left === 'undefined'); // 8px 10px 12px

    const validOptions = stylelint.utils.validateOptions(result, ruleName, { actual });

    if (!validOptions) {
      return;
    }

    root.walkDecls(checkShorthandProperty);
  }
);

module.exports.ruleName = ruleName;
module.exports.messages = messages;
