const { clampAfter, dec, inc, over, assignWhen } = require("../../helper");
const { State, composeK, map, propEq } = require("crocks");

// limitMoves :: (a -> Number) -> a -> Number
const limitMoves = clampAfter(0, 8);

// decLeft :: () -> State AppState ()
const decLeft = () => over("left", limitMoves(dec));

// incMoves :: () -> State AppState ()
const incMoves = () => over("moves", limitMoves(inc));

// applyMove :: () -> State AppState ()
const applyMove = composeK(
  decLeft,
  incMoves
);

// markSelected :: String -> Object -> Object
const markSelected = id => assignWhen(propEq("id", id), { selected: true });

// selectCard :: String -> State AppState ()
const selectCard = id => over("cards", map(markSelected(id)));

// answer_old :: String -> State AppState ()
const answer_old = id =>
  State.of(id)
    .chain(selectCard)
    .chain(applyMove);

// answer :: String -> State AppState ()
const answer = composeK(
  applyMove,
  selectCard
);

module.exports = answer;
