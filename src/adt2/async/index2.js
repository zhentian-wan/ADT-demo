const { readFile } = require("fs");
const { Async, tryCatch, resultToAsync } = require("crocks");

const e = e => console.error("rej", e);
const s = s => console.log("res", s);

const parse = tryCatch(JSON.parse);
const readFileAsync = Async.fromNode(readFile);
readFileAsync("output.json", "utf8")
  .chain(resultToAsync(parse))
  .fork(e, s);
