const {fork, loadTextFile} = require('./funs.js');
const {Async, curry, safe, mapReduce, maybeToAsync} = require('crocks');

const data = [
    'text.txt',
    'notfound.txt',
    'text.big.txt',
];

const isValid = x => x.length > 50;

const concatAlt = pred =>
    (acc, curr) =>
        acc.alt(curr)
        .chain(maybeToAsync(new Error('not good!'), safe(pred)))

const flow = curry(pred => mapReduce(
    loadTextFile, //map
    concatAlt(pred), // reduce
    Async.Rejected(new Error('list is empty')) //Seed
));

fork(flow(isValid, data));