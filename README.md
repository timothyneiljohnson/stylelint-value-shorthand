# stylelint-value-shorthand

[![Build Status](https://travis-ci.org/timothyneiljohnson/stylelint-value-shorthand.svg)](https://travis-ci.org/timothyneiljohnson/stylelint-value-shorthand)

A [stylelint](https://github.com/stylelint/stylelint) custom rule to enforce use of shorthand values.

This rule will cause stylelint to warn you whenever an the preferred convention is not used.

## Installation

```
npm install stylelint-value-shorthand
```

This plugin is compatible with v5.0.1+.

## Details

```css
a { /* OK */
  margin: 0
}

a { /* Not OK */
  margin: 0 0 0 0
}
```
```css
a { /* OK */
  border-color: $gray $blue $black
}

a { /* Not OK */
  border-color: $gray $blue $black $blue
}
```

With the `convention` option set to `'none'`:
```css
a { /* OK */
  border: none
}

a { /* Not OK */
  border: 0
}
```

### This rule applies to properties which are able to be written in shorthand.

```
border-color
border-radius
border-style
border-width
margin
padding
```

## Usage

Add `"stylelint-value-shorthand"` to your stylelint config `plugins` array, then add `value-shorthand` to your rules, set to true.

As follows:

```js
{
  "plugins": [
    "stylelint-value-shorthand"
  ],
  "rules": {
    "value-shorthand": true
  }
};
```
