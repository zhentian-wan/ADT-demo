const log = require("./log");
const {
  assign,
  compose,
  constant,

  ifElse,
  isArray,
  isNil,
  flip,
  when,
  not,
  map,
  defaultProps
} = require("crocks");
const {
  assoc,

  gt,
  length,
  propSatisfies,
  toPairs
} = require("ramda");

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

// isLarge :: a -> Boolean
const isLarge = propSatisfies(flip(gt, 3), "length");

const defaultConfig = defaultProps({
  time: 1,
  min: 1,
  max: 2
});

const response = {
  time: null,
  min: 2,
  max: 3
};

log(defaultConfig(response));
