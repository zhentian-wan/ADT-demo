const log = require('./lib/log');
const {deck, displayCards, shuffleCards} = require('./model/deck');

const toHex =
x => `0x${x.toString(16).length % 2 ? '0' : ''}${x.toString(16)}`;

function* rando (seed) {
    let x = seed;

    while (true) {
        yield (
            x = (1103515245 * x + 12345) & 0x7ffffff,
            (x >>> 16) / 0x7ff
        )
    }
}

const limitTo =
    lim => x => Math.floor(x * lim)

const gen = rando(10);

const take = (n, g) =>
    (new Array(n).fill(null).map(() => g.next().value));

log(
    take(20, gen).map(limitTo(51))
);