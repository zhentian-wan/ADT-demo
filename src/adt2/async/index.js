const log = require("./log");
const { readFile, writeFile } = require("fs");
const {
  Async,
  omit,
  tryCatch,
  Result,
  constant,
  identity,
  isNumber,
  resultToAsync
} = require("crocks");

const e = e => console.error("rej", e);
const s = s => console.log("res", s);

const m = Async((rej, res) => {
  setTimeout(() => rej(23), 1000);
})
  .bimap(constant("error happen"), identity) // if resolve call identity (on the right), if not call constant on the left
  //.swap(constant(1), identity) // if resolve call idenetity, then turn resolve to reject; vise visa
  //.coalesce(constant(1), identity) // is resolve call identity, if reject, call constant() and turn it to resolve
  .map(x => x * 2);

// m.fork(e, s);

const notNumber = x => {
  if (!isNumber(x)) {
    throw new Error(x);
  }
  return x;
};

const parse = tryCatch(JSON.parse);
const readFileAsync = Async.fromNode(readFile);
const writeFileAsync = Async.fromNode(writeFile);
const mm = readFileAsync("data.json", "utf8")
  .chain(resultToAsync(parse))
  .chain(x =>
    writeFileAsync("output.json", JSON.stringify(x, null, 2)).map(constant(x))
  )
  .map(omit(["config"]))
  .chain(x =>
    writeFileAsync("output-a.json", JSON.stringify(x, null, 2)).map(constant(x))
  );

mm.fork(e, s);
