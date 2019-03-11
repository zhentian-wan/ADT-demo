const log = require('./lib/log');

const Pair = require('crocks/Pair')

const {deck, displayCards} = require('./model/deck');

const p = Pair([], deck);

log(
    p
);