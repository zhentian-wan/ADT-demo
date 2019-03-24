const log = require('./lib/log');
const State = require('crocks/State');
const {pullRandom} = require('./model/randoArr.js');

// limitIndx :: Integer -> Float -> Integer
const limitIndx = len => x => (x * len) | 0;

const seed = 76;
log(
    pullRandom()
    .execWith({seed: 10})
);