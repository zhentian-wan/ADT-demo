const log = require('./lib/log');
const bimap = require('crocks/pointfree/bimap');
const {deck, displayCard, pickRandom} = require('./model/deck');

const initState = {
    seed: 23,
    deck
}

const look = bimap(
    x => displayCard(x.option('')), 
    xs => xs.length
);

const game = pickRandom()
    .chain(pickRandom)
    .chain(pickRandom)
    .chain(pickRandom)
    .chain(pickRandom)
    .chain(pickRandom)
    .chain(pickRandom)
    .chain(pickRandom)
    .execWith(initState);
    
log(
    look(game.deck)
);