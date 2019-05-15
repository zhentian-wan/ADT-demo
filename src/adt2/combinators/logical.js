const log = require("./log");
const { compose, constant, ifElse, isArray } = require("crocks");
const { length } = require("ramda");

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

// whenArrayHasLength :: a -> Boolean
const whenArrayHasLength = implies(isArray, hasLength);

log(whenArrayHasLength([1, 2]));
