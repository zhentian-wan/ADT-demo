const { State, chain, find, propEq, option } = require("crocks");
const { getState } = require("../../helper");

const { get } = State;

// Hint :: {color: String, shape: String}

// getHint :: () -> State AppState Hint
const getHint = () =>
  getState("hint").map(option({ color: "unknown", shape: "unknown" }));

const getCard = id =>
  getState("cards")
    .map(chain(find(propEq("id", id))))
    .map(option({ id, color: "unknown", shape: "unknown" }));

module.exports = {
  getHint,
  getCard
};
