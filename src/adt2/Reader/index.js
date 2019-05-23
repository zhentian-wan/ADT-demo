const { readJSON, writeJSON, fork } = require("./helper");
const { Async, Reader, constant, pipeK, prop, liftA2 } = require("crocks");
const log = require("./log");
const { ask } = Reader;

const data = {
  happy: true,
  sad: false
};
const pairUp = liftA2(x => y => [x, y]);
// a -> m b
const happy = ask(prop("happy"));
const sad = ask(prop("sad"));

const m = happy.chain(h => sad.map(pairUp(h)));

log(m.runWith(data));
