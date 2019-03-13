const log = require('./lib/log');
const Pair = require('crocks/Pair');
const State = require('crocks/State');

const assign = require('crocks/helpers/assign');

const {deck, displayCards, shuffleCards} = require('./model/deck');

 // State s a

 const rando = () => State(s => {
     const seed = (1103515245 * s.seed + 12345) & 0x7ffffff;
     const value = (seed >>> 16) / 0x7ff;

     return Pair(value, assign({seed}, s))
 })



log(
    rando().runWith({seed: 10})
);