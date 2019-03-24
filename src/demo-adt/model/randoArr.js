const {modify, get} = require('crocks/State');
const Arrow = require('crocks/Arrow');
const K = require('crocks/combinators/constant');
const B = require('crocks/combinators/composeB');

const assign = require('crocks/helpers/assign');
const branch = require('crocks/Pair/branch');
const prop = require('crocks/Maybe/prop');
const option = require('crocks/pointfree/option');
const merge = require('crocks/pointfree/merge');

// calcSeed :: Arrow Integer
const calcSeed = Arrow(x => (1103515245 * x + 12345) & 0x7fffffff);

// value :: Arrow (Pair Integer) -> Pair (Integer Float)
const value = Arrow(x => (x >>> 16) / 0x7fff).second();

// genRandom :: Arrow Integer Object
const genRandom = calcSeed
    .map(branch)
    .compose(value)
    .map(p => [p.fst(), p.snd()])

// rando : Integer -> State Object Float
const rando = x => {
    const [seed, value] = genRandom.runWith(x);
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