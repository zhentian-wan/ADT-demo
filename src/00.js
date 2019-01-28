const { curry, compose, Pair, State, mapProps, composeK } = require("crocks");

const { get } = State;

// State s a
// We define State as a fixed type of state 's' or the left and a variable 'a' on the right
// (s -> (a, s))
// State Unit defined as Pair(a, s) with 'a' variable on the left and 's' on the right

// add :: Number -> Number -> Number 
const add = x => y => x + y;

// pluralize :: (String, String) -> Number -> String
const pluralize = (single, plural) => num => `${num} ${Math.abs(num) === 1 ? single : plural}`;

// makeAwesome :: Number -> String
const makeAwesome = pluralize('Awesome', 'Awesomes')

// flow :: Number -> String
const flow = compose(
    makeAwesome,
    add(10)
)
console.log(
    get()
        .map(flow)
        .runWith(2)
        .fst()
)