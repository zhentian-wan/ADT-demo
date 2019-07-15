const {
  State,
  assoc,
  composeK,
  constant,
  converge,
  liftA2
} = require("crocks");

const { liftState, over } = require("../helpers");

const { get, modify } = State;

// nextSeed :: Integer -> Integer
const nextSeed = seed => (seed * 1103515245 + 12345) & 0x7fffffff;

// value :: Integer -> Number
const value = seed => (seed >>> 16) / 0x7fff;

// normalize :: (Integer, Integer) -> Number -> Integer
const normalize = (min, max) => x => Math.floor(x * (max - min)) + min;

// getNextSeed :: () -> State AppState Integer
const getNextSeed = () => get(({ seed }) => nextSeed(seed));

// updateSeed :: Integer -> State AppState ()
const updateSeed = seed => modify(assoc("seed", seed));

// nextValue :: Integer -> State AppState Number
const nextValue = converge(liftA2(constant), liftState(value), updateSeed);
// random :: () -> State AppState Number
const random = composeK(
  nextValue,
  getNextSeed
);

// between :: (Integer, Integer) -> State AppState Integer
const between = (min, max) => random().map(normalize(min, max));
