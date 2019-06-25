const { clampAfter, dec, inc, over } = require("../../helper");
const { composeK } = require("crocks");
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

module.exports = {
  decLeft,
  incMoves,
  applyMove
};
