const {modify, get} = require('crocks/State');
const K = require('crocks/combinators/constant');
const B = require('crocks/combinators/composeB');

const assign = require('crocks/helpers/assign');
const prop = require('crocks/Maybe/prop');
const option = require('crocks/pointfree/option');

// rando : Integer -> State Object Float
const rando = x => {
    const seed = (1103515245 * x + 12345) & 0x7fffffff
    const value = (seed >>> 16) / 0x7fff;

    return modify(assign({seed})) // update the seed Pair(_, seed)
        .map(K(value)); // update the value Pair(value, seed)
}

// pullRandom :: Integer -> State Object Float
const pullRandom = defSeed =>
    get(s => pluckSeed(defSeed)).chain(rando);

// pluckSeed :: Integer -> Object -> Integer
const pluckSeed =
    def => B(option(def), prop('seed'))



module.exports = {
    pullRandom
};