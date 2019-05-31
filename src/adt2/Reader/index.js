const { readJSON, writeJSON, fork } = require("./helper");
const { Async, Reader, ReaderT, pipeK, assign, constant } = require("crocks");

const input = defValAsync =>
  Reader(({ input }) =>
    readJSON(input).chain(val => defValAsync.map(assign(val)))
  );
const output = asyncInput =>
  Reader(({ output }) => asyncInput.chain(writeJSON(output)));
const env = {
  input: "data.json",
  output: "output.json"
};
const flow = data =>
  Reader.of(Async.of(data))
    .chain(input)
    .chain(output);

fork(flow({ age: 23 }).runWith(env));
/**
{
  "age": 23,
  "name": "Zhentian",
  "port": 8080
}
/*
const ReaderAsync = ReaderT(Async);

const input = data =>
  ReaderAsync(({ input }) => readJSON(input).map(assign(data)));
const output = data => ReaderAsync(({ output }) => writeJSON(output, data));

const env = {
  input: "data.json",
  output: "output.json"
};

const flow = pipeK(
  ReaderAsync.of,
  input,
  output
);

fork(
  flow({
    age: 30
  }).runWith(env)
);
*/
