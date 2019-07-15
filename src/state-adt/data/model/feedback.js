const {
  State,
  compose,
  composeK,
  constant,
  converge,
  liftA2,
  equals,
  chain,
  find,
  propEq,
  option,
  map,
  omit
} = require("crocks");
const {
  getState,
  over,
  liftState,
  clampAfter,
  decOrInc
} = require("../../helper");

const { get } = State;

// Hint :: {color: String, shape: String}
// Card :: {id: String, color: String, shape: String}

// getHint :: () -> State AppState Hint
const getHint = () =>
  getState("hint").map(option({ color: "unknown", shape: "unknown" }));

// getCard :: String -> State AppState Card
const getCard = id =>
  getState("cards")
    .map(chain(find(propEq("id", id))))
    .map(option({ id, color: "unknown", shape: "unknown" }));

// setIsCorrect :: Boolean -> State AppState ()
const setIsCorrect = isCorrect => over("isCorrect", constant(isCorrect));

// cardToHint :: Card -> State AppState Hint
const cardToHint = composeK(
  liftState(omit(["id"])),
  getCard
);

const limitRank = clampAfter(0, 4);

// adjustRank :: Boolean -> Number -> Number
const adjustRank = compose(
  limitRank,
  decOrInc
);

// updateRank :: Boolean -> State AppState ()
const udpateRank = isCorrect => over("rank", adjustRank(isCorrect));

// applyFeedback :: Boolean -> State AppState ()
const applyFeedback = converge(liftA2(constant), udpateRank, setIsCorrect);

// validateAnswer :: String -> State AppState Boolean
const validateAnswer = converge(liftA2(equals), cardToHint, getHint);

const feedback = composeK(
  applyFeedback,
  validateAnswer
);

module.exports = feedback;
