const log = require("./lib/log");
const { applyMove } = require("./data/model/answer");

const state = {
  left: 8,
  moves: 0
};

log(
  applyMove()
    .chain(applyMove)
    .execWith(state)
);
