const fs = require('fs');
const {Async, constant, composeK, curry} = require('crocks');
const {fromNode} = Async;

const access = fromNode(fs.access);
const readFile = fromNode(fs.readFile);

const accessAsync = curry((mode, path) =>
  access(path, mode)
  .map(constant(path)));

// readFileAsync :: Option -> a -> Async Error b
const readFileAsync = curry((option, path) =>
    readFile(path, option));

const checkRead = accessAsync(fs.constants.F_OK);
const readTextFile = readFileAsync('utf-8');

// loadTextFile :: String -> Async Error String
const loadTextFile = composeK(
    readTextFile,
    checkRead
);

const fork = a => a.fork(
    console.log.bind(null, 'rej'),
    console.log.bind(null, 'res')
);

module.exports = {
    loadTextFile,
    fork
}