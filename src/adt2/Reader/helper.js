const { readFile, writeFile } = require("fs");
const { curry, tryCatch, Async, resultToAsync, constant } = require("crocks");
const log = require("./log");

const parse = tryCatch(JSON.parse);
const readAsync = Async.fromNode(readFile);
const writeAsync = Async.fromNode(writeFile);
// writeJSON :: String -> a -> Async Error a
const writeJSON = curry((file, data) =>
  writeAsync(file, JSON.stringify(data, null, 2)).map(constant(data))
);
//readJSON :: String -> Async Error a
const readJSON = file => readAsync(file, "utf8").chain(resultToAsync(parse));
const fork = m => m.fork(log.bind(null, "rej"), log.bind(null, "res"));

module.exports = {
  fork,
  readJSON,
  writeJSON
};
