const log = require("./lib/log");
const { chain } = require("crocks");
const { nextHint } = require("./data/model/turn");
const { drawCardAt, generateCards } = require("./data/model/game");
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
  seed: 23
};

log(
  generateCards()
    .map(drawCardAt(0))
    .map(chain(drawCardAt(7)))
    .map(chain(drawCardAt(2)))
    .evalWith(state)
    .fst().length
);
