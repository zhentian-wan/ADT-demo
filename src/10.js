const {prop,assoc, Pair, pick, bimap, State, snd, identity, omit, curry, filter, fanout, converge,map, composeK, liftA2, equals, constant,option, chain, mapProps, find, propEq, isNumber, compose, safe} = require('crocks');
const  {get, modify, of} = State; 

const state = {
    colors: [ 'orange', 'green', 'blue', 'yellow' ],
    shapes: [ 'square', 'triangle', 'circle' ],
    seed: Date.now()
};

const liftState = (fn) => compose(
    of, fn
);
const getState = key => get(prop(key))

// #region random 
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

// between :: (Integer, Integer) -> State AppState Integer
const between = (min, max) => 
    random()
        .map(normalize(min, max));

const randomIndex = xs => between(0, xs.length);        
// #endregion

// #region generate

const getColors = () => getState('colors').map(option([]));
const getShapes = () => getState('shapes').map(option([]));
const buildCard = curry((color, shape) => ({
    id: `${color}-${shape}`,
    color,
    shape
}));
const buildCards = liftA2(buildCard);
const generateCards = converge(
    liftA2(buildCards),
    getColors,
    getShapes
);

// #endregion

// #region draw 
const getAt = index => array => Array.of(array[index]);
const unsetAt = index => array => [
    ...array.slice(0, index),
    ...array.slice(index + 1)
];
const drawCardAt = index => fanout(getAt(index), unsetAt(index));
// #endregion

// getDeck :: () -> State AppState Deck
const getDeck = () => generateCards()
    .map(xs => Pair([], xs));
/**
 Pair( 
     [ ],
     [ { id: "orange-square", color: "orange", shape: "square" }, { id: "orange-triangle", color: "orange", shape: "triangle" }, { id: "orange-circle", color: "orange", shape:
"circle" }, { id: "green-square", color: "green", shape: "square" }, { id: "green-triangle", color: "green", shape: "triangle" }, { id: "green-circle", color: "green", shape: "circle" }, { id: "blue-square", color: "blue", shape: "square" }, { id: "blue-triangle", color: "blue", shape: "triangle" }, { id: "blue-circle", color: "blue", shape: "circle" }, { id: "yellow-square", color: "yellow", shape: "square" }, { id: "yellow-triangle", color: "yellow", shape: "triangle" }, { id: "yellow-circle", color: "yellow", shape: "circle" } ] 
) 
 */
// draw ::  Integer -> Deck -> Deck    
const draw = compose(
    chain,
    drawCardAt
);
// const draw = index => deck => deck.chain(drawCardAt(index))

// drawRandom :: Deck -> State AppState Deck
// From the right side pair, get a random index, then draw the card by index
const drawRandom = converge(
    liftA2(draw),
    compose(
        randomIndex,
        snd
    ),
    liftState(identity)
)

console.log(
    getDeck()
        .chain(drawRandom)
        .chain(drawRandom)
        .chain(drawRandom)
        .evalWith(state).fst()
)
/**
 * [ { id: 'orange-square', color: 'orange', shape: 'square' },
  { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  { id: 'blue-square', color: 'blue', shape: 'square' } ]
 */
console.log(
    getDeck()
        .chain(drawRandom)
        .chain(drawRandom)
        .chain(drawRandom)
        .evalWith(state).snd()
)
/**
 [ { id: 'orange-triangle', color: 'orange', shape: 'triangle' },
  { id: 'orange-circle', color: 'orange', shape: 'circle' },
  { id: 'green-square', color: 'green', shape: 'square' },
  { id: 'green-triangle', color: 'green', shape: 'triangle' },
  { id: 'green-circle', color: 'green', shape: 'circle' },
  { id: 'blue-circle', color: 'blue', shape: 'circle' },
  { id: 'yellow-square', color: 'yellow', shape: 'square' },
  { id: 'yellow-triangle', color: 'yellow', shape: 'triangle' },
  { id: 'yellow-circle', color: 'yellow', shape: 'circle' } ]
 */