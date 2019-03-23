const log = require('./lib/log');
const State = require('crocks/State');
const {pullRandom} = require('../model/rando.js');

// limitIndx :: Integer -> Float -> Integer
const limitIndx = len => x => (x * len) | 0;

const seed = 76;
log(
    State.of(seed)
    .chain(pullRandom) // 'Pair( 0.13864558854945525, { seed: 297746555 } )'
    .map(limitIndx(52)) // 'Pair( 7, { seed: 297746555 } )'
    .runWith({seed: 10})
);