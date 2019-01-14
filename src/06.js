const {State, assoc, constant, compose, composeK, liftA2, converge} = require('crocks');
const {get, modify, of} = State;
// int - int
const nextSeed = seed => (seed * 1103515245 + 12345) & 0x7ffffff;

// value :: Integer -> Number
const value = seed => (seed >>> 16) / 0x7fff

//normalize :: (Integer, Integer) -> Number -> Integer
const normalize = (min, max) => x => Math.floor(x * (max- min)) + min;

// getNextSeed :: () -> State AppState Integer
const getNextSeed = () => get(({seed}) => nextSeed(seed));

// updateSeed :: () -> State AppState ()
const updateSeed = (seed) => modify(assoc('seed', seed));

const liftState = fn => compose(
    of,
    fn
)
// nextValue ::  Integer -> State AppState Number
const nextValue = converge(
    liftA2(constant),
    liftState(value),
    updateSeed
)

// random :: () -> State AppState Number
const random = composeK(
    nextValue,
    getNextSeed
)

// between :: (Integer, Integer) -> State AppState Integer
const between = (min, max) => 
    random()
        .map(normalize(min, max));

const state = {
    seed: Date.now()
}

console.log(
    between(0, 200)
        .evalWith(state)
)