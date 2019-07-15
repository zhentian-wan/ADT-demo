const {
  State,
  assign,
  compose,
  curry,
  mapProps,
  when,
  prop
} = require("crocks");

const { get, modify } = State;

// inc :: Number -> Number
const inc = x => x + 1;

// dec :: Number -> Number
const dec = x => x - 1;

// decOrInc :: Boolean -> Number -> Number
const decOrInc = x => (x ? dec : inc);

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

// getState :: String -> State Object (Maybe a)
const getState = key => get(prop(key));

// liftState :: (a -> b) -> a -> State s b
const liftState = fn =>
  compose(
    State.of,
    fn
  );

module.exports = {
  clamp,
  clampAfter,
  dec,
  decOrInc,
  getState,
  liftState,
  over,
  inc,
  assignWhen
};
