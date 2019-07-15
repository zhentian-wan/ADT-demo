const log = require("./lib/log");
const feedback = require("./data/model/feedback");

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
  isCorrect: null,
  rank: 4,
  left: 8,
  moves: 0,
  seed: 23
};

log(feedback("green-square").execWith(state));
