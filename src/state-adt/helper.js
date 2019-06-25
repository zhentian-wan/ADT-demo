const { State, compose, curry, mapProps } = require("crocks");

const { modify } = State;

// inc :: Number -> Number
const inc = x => x + 1;

// dec :: Number -> Number
const dec = x => x - 1;

// clamp :: (Number, Number) -> Number -> Number
const clamp = (min, max) => x => Math.min(Math.max(min, x), max);

// clampAfter :: Number -> Number -> (a -> Number) -> Number
const clampAfter = curry((min, max, fn) =>
  compose(
    clamp(min, max),
    fn
  )
);

// over :: (String, (a -> b)) -> Object -> State Object ()
const over = (key, fn) => modify(mapProps({ [key]: fn }));

module.exports = {
  clamp,
  clampAfter,
  dec,
  over,
  inc
};
