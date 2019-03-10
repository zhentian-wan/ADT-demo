const {fork, loadTextFile} = require('./funs.js');
const {Async, bimap, fanout, constant, flip, Pair, identity, mapReduce} = require('crocks');

const data = [
    'text.txt',
    'text.big.txt',
    'notfound.txt',
];

const fn = flip(
    xs => bimap(
        //e => Pair(xs, e),
        fanout(constant(xs), identity),
        currVal =>  xs.concat(currVal)
    )
);
/*
const concatSpecial = (acc, currAsync) =>
    acc.chain(
        xs => currAsync.bimap(
            e => Pair(xs, e),
            currVal =>  xs.concat(currVal))
    );*/
const concatSpecial = (acc, currAsync) =>
    acc.chain(
        fn(currAsync)
    );
// Async (Pair [String] Error) [String]
const flow = mapReduce(
    loadTextFile,
    concatSpecial,
    Async.Resolved([])
);

flow(data).fork(
    e => console.log(e.snd(), e.fst()), // Pair(success, error)
    r => console.log(r), // Just success result
)