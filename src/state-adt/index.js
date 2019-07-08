const log = require("./lib/log");
const { State } = require("crocks");
const { getHint, getCard } = require("./data/model/feedback");

const state = {
  cards: [
    { id: "green-square", color: "green", shape: "square" },
    { id: "orange-square", color: "orange", shape: "square" },
    { id: "blue-triangle", color: "blue", shape: "triangle" }
  ],
  hint: {
    color: "green",
    shape: "square"
  },
  left: 8,
  moves: 0
};

log(getCard("green-squares").evalWith(state));
