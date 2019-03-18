const log = require('./lib/log');

const State = require('crocks/State');
const B = require('crocks/combinators/composeB');
const K = require('crocks/combinators/constant');
const prop = require('crocks/Maybe/prop');
const option = require('crocks/pointfree/option');
const {modify, get} = State;
const assign = require('crocks/helpers/assign');

// pluckSeed :: Integer -> Object -> Integer
const pluckSeed =
    def => B(option(def), prop('seed'))

// rando : Integer -> State Object Float
const rando = x => {
    const seed = (1103515245 * x + 12345) & 0x7fffffff
    const value = (seed >>> 16) / 0x7fff;

    return modify(assign({seed})) // update the seed Pair(_, seed)
        .map(K(value)); // update the value Pair(value, seed)
}

// pullRandom :: Integer -> State Object Float
const pullRandom =
    defSeed => get(s => pluckSeed(defSeed)).chain(rando);

// limitIndx :: Integer -> Float -> Integer
const limitIndx = len => x => (x * len) | 0;

const seed = 76;
log(
    State.of(seed)
    .chain(pullRandom) // 'Pair( 0.13864558854945525, { seed: 297746555 } )'
    .map(limitIndx(52)) // 'Pair( 7, { seed: 297746555 } )'
    .runWith({seed: 10})
);