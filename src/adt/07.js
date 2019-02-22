const {prop,assoc, pick, State, identity, omit, curry, filter, converge,map, composeK, liftA2, equals, constant,option, chain, mapProps, find, propEq, isNumber, compose, safe} = require('crocks');
const  {get, modify, of} = State; 

const state = {
    cards: [
        {id: 'green-square', color: 'green', selected: true, shape: 'square'},
        {id: 'orange-square', color: 'orange', shape: 'square'},
        {id: 'blue-triangle', color: 'blue', shape: 'triangle'}
    ],
    hint: null,
    seed: Date.now()
}

// #region helper

const liftState = fn => compose(
    of,
    fn
)

// nextSeed :: Integer -> Integer
const nextSeed = seed =>
  (seed * 1103515245 + 12345) & 0x7fffffff

// value :: Integer -> Number
const value = seed =>
  (seed >>> 16) / 0x7fff

// normalize :: (Integer, Integer) -> Number -> Integer
const normalize = (min, max) =>
  x => Math.floor(x * (max - min)) + min

// getNextSeed :: () -> State AppState Integer
const getNextSeed = () =>
  get(({ seed }) => nextSeed(seed))

// updateSeed :: Integer -> State AppState ()
const updateSeed = seed =>
  modify(assoc('seed', seed))

// nextValue :: Integer -> State AppState Number
const nextValue = converge(
  liftA2(constant),
  liftState(value),
  updateSeed
)

// random :: () -> State AppState Number
const random =
  composeK(nextValue, getNextSeed)
// #endregion

// between :: (Integer, Integer) -> State AppState Integer
const between = (min, max) => 
    random()
        .map(normalize(min, max));

// Get all unselected card
// Randomly choose an unselected Card
// Set hint



const selectState = (key, fn) => get(
    compose(
        map(fn),
        prop(key)
    )
)
const unselected = ({selected}) => !selected;
const getUnselectedCards = () => selectState('cards', filter(unselected)).map(option([]))

// randomIndex :: [a] -> State AppState a
const randomIndex = arr => between(0, arr.length)
const getAt = index => arr => arr[index];
const pickCard = converge(
    liftA2(getAt),
    randomIndex,
    liftState(identity)
)
const over = (key, fn) => modify(
    mapProps({[key]: fn})
)
const toHint = pick(['color', 'shape'])
// setHint :: Card -> State AppState()
const setHint = card => over('hint', constant(toHint(card)))
const nextHint = composeK(
    setHint,
    pickCard,
    getUnselectedCards
)

console.log(
    nextHint()
        .execWith(state)
)