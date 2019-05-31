const { readJSON, writeJSON, fork } = require("./helper");
const { Async, ReaderT, omit, pipeK, assign } = require("crocks");

const ReaderAsync = ReaderT(Async);
const env = {
  input: "data.json",
  output: "output.json"
};

const input = env =>
  ReaderAsync(({ input }) => readJSON(input).map(assign({ env })));
const config = data =>
  ReaderAsync(() =>
    readJSON(data.config[data.env])
      .map(assign(data))
      .map(omit(["config"]))
  );
const output = inputData =>
  ReaderAsync(({ output }) => writeJSON(output, inputData));
const flow = pipeK(
  ReaderAsync.of,
  input,
  config,
  output
);

fork(flow("test").runWith(env));
