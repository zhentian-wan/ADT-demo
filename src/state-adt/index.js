const log = require("./lib/log");
const { chain } = require("crocks");
const { nextHint } = require("./data/model/turn");
const { pickCards } = require("./data/model/game");
const state = {
  cards: [
    { id: "green-square", color: "green", shape: "square" },
    { id: "orange-square", color: "orange", shape: "square" },
    { id: "blue-triangle", color: "blue", shape: "triangle", selected: true }
  ],
  colors: ["orange", "green", "blue", "yellow"],
  shapes: ["square", "triangle", "circle"],
  hint: null,
  seed: Date.now(),
  isCorrect: null,
  rank: 4,
  left: 8,
  moves: 0,
  seed: Date.now()
};

log(pickCards().execWith(state));
