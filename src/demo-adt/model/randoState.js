const {modify, get} = require('crocks/State');
const B = require('crocks/combinators/composeB');

const assign = require('crocks/helpers/assign');
const prop = require('crocks/Maybe/prop');
const option = require('crocks/pointfree/option');

//initialState :: GameState
const initialState = {
    deck: [],
    seed: 23
}

// newSeed :: Int -> INt
const newSeed = seed => (1103515244 * seed + 12345) & 0x7fffffff;
// calcValue :: Int -> Float
const calcValue = seed => (seed >>> 16) / 0x7fff;

// pluckSeed :: Integer -> GameState -> Integer
const pluckSeed =
    def => B(option(def), prop('seed'));

// getSeed :: () -> State GameState Int
const getSeed = () => get(pluckSeed({seed: 0})); 

// putSeed :: Int -> State GameState ()
const putSeed = seed => modify(assign({seed}));

// genSeed :: () -> State GameState ()
// get default seed
// map to a new seed
// update current seed in state
const genSeed = () => 
    getSeed()
        .map(newSeed)
        .chain(putSeed);

// evaluate :: () -> State GameState Float        
const evaluate = () => 
    getSeed()
        .map(calcValue);

// pullRandom :: () -> State GameState Float     
const pullRandom = () => 
    genSeed()
        .chain(evaluate);    

console.log(
    pullRandom()
    .runWith(initialState)
)
