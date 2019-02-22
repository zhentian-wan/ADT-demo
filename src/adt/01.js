const { curry, compose, State, mapProps, composeK } = require("crocks");

const { modify } = State;

const state = {
  left: 8,
  moves: 0
};

const inc = x => x + 1;
const dec = x => x - 1;

const clamp = (min, max) => x => Math.min(Math.max(min, x), max);
const clampAfter = curry((min, max, fn) =>
  compose(
    clamp(min, max),
    fn
  )
);
const over = (key, fn) => modify(mapProps({ [key]: fn }));

const limitMoves = clampAfter(0, 8);

const decLeft = () => over("left", limitMoves(dec));
const incMoves = () => over("moves", limitMoves(inc));

// Then there are a series of chain functions, using composeK
/**
 * replace: 
 *  decLeft()
 *      .chain(decLeft)
 *      .chain(decLeft)
 *      .chain(decLeft)
 *      .chain(incMoves)
 *      .chain(incMoves)
 */
const applyMove = composeK(
    incMoves, incMoves, decLeft, decLeft, decLeft
)

const res = applyMove()
  .execWith(state);
console.log(res); //{ left: 5, moves: 2 }
