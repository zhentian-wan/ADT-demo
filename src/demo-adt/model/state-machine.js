
const State = require('crocks/State');
const Pair = require('crocks/Pair');
const Unit = require('crocks/Unit');

const {get, modify, set} = State;

// add :: Int -> Int -> Int
const add = x => y => y + x;

// State s a
// (s -> (a, s))
// a -> m b keisly arrow

// if we want to chain state transform, we need to have a function
// addNickel :: () -> State Int ()
//const addNickel = () => State(s => Pair(Unit(), s + 5))
const addNickel = () => modify(add(5));
// addDime = () 0> State Int ()
const addDime = () => modify(add(10));
const addQuarter = () => modify(add(25));
const addLooney = () => modify(add(100));

// canVend :: INt -> Boolean
const canVend = n => n >= 100;

// evaluate :: () -> State Int Bool
const evaluate = () => get(canVend);

// state :: State Int()
const state = addNickel()
    .chain(addDime)
    .chain(addQuarter)
    .chain(addQuarter)
    .chain(addQuarter)
    .chain(addQuarter)

// get().map(fn) === get(fn)

console.log(
    state
    .chain(evaluate)
    .runWith(0)
)