const { readJSON, writeJSON, fork } = require("./helper");
const { Async, Reader, constant, pipeK } = require("crocks");

// a -> m b, using K
// readJSON("data.json").chain(writeJSON("output-b.json"))
const flow = pipeK(
  constant(Async.of("data.json")),
  readJSON,
  writeJSON("output-b.json")
);

fork(flow);
