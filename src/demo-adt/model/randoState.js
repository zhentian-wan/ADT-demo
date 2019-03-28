const {getKey, putKey} = require('./helper.js')

// newSeed :: Int -> INt
const newSeed = seed => (1103515244 * seed + 12345) & 0x7fffffff;
// calcValue :: Int -> Float
const calcValue = seed => (seed >>> 16) / 0x7fff;

// getSeed :: () -> State GameState Int
const getSeed = getKey('seed', {seed: 0}); 

// putSeed :: Int -> State GameState ()
const putSeed = putKey('seed');

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

module.exports = {
    pullRandom
}