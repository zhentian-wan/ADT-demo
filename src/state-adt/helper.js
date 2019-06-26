const { State, assign, compose, curry, mapProps, when } = require("crocks");

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

// assignWhen :: ((a -> Boolean), Object) -> Object -> Object
const assignWhen = (pred, obj) => when(pred, assign(obj));

// over :: (String, (a -> b)) -> Object -> State Object ()
const over = (key, fn) => modify(mapProps({ [key]: fn }));

module.exports = {
  clamp,
  clampAfter,
  dec,
  over,
  inc,
  assignWhen
};
