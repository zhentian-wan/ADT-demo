const log = require("./log");
const {
  or,
  compose,
  constant,
  isString,
  ifElse,
  isArray,
  flip,
  defaultProps
} = require("crocks");
const { allPass, gt, length, propSatisfies } = require("ramda");

// week logic
// p q  p => q
// T T  T
// T F  F
// F T  T
// F F  T

// isRaining => roadsWet
// gt(10) => gt(5)  // T T  T -- this is strong logic
// gt(10) => gt(15) // T F  F -- this is week logic, input can be 11, result is F, or can be 16, result is T

// implies :: ((a -> Boolean), (a -> Boolean)) -> a -> Boolean
const implies = (p, q) =>
  ifElse(
    p,
    compose(
      Boolean,
      q
    ),
    constant(true)
  );

// hasLEngth :: a -> Boolean
const hasLength = compose(
  Boolean,
  length
);
// isLarge :: a -> Boolean
const isLarge = propSatisfies(flip(gt, 3), "length");
const arrayWithLength = implies(isArray, hasLength);
const isLargeString = implies(isString, isLarge);

/**
 * isValidStringOrArray is week can check array has length
 * or string is large, only for those two types
 * other types, such as number, objet, it return false
 */
const isValidStringOrArray = allPass([
  or(isString, isArray),
  arrayWithLength,
  isLargeString
]);

log(isLargeString(undefined)); // true
log(arrayWithLength(undefined)); // true
log(isValidStringOrArray(undefined)); // false
log(isValidStringOrArray({})); // false
log(isValidStringOrArray([1, 2])); // true
log(isValidStringOrArray("fwe")); // false
log(isValidStringOrArray("fwef")); // true
