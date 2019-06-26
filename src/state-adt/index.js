const log = require("./lib/log");
const { State } = require("crocks");
const answer = require("./data/model/answer");

const state = {
  cards: [
    { id: "green-square", color: "green", shape: "square" },
    { id: "orange-square", color: "orange", shape: "square" },
    { id: "blue-triangle", color: "blue", shape: "triangle" }
  ],
  left: 8,
  moves: 0
};

log(
  State.of("green-square")
    .chain(answer)
    .execWith(state)
);
