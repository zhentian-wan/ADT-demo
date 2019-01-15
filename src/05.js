const {prop, State, omit, curry, converge,map, composeK, liftA2, equals, constant,option, chain, mapProps, find, propEq, isNumber, compose, safe} = require('crocks');
const  {get, modify, of} = State; 

const state = {
    cards: [
        {id: 'green-square', color: 'green', shape: 'square'},
        {id: 'orange-square', color: 'orange', shape: 'square'},
        {id: 'blue-triangle', color: 'blue', shape: 'triangle'}
    ],
    hint: {
        color: 'green',
        shape: 'square'
    },
    isCorrect: null,
    rank: 2
}

const inc = x => x + 1;
const dec = x => x - 1;
const incOrDec = b => b ? dec :  inc;
const clamp = (min, max) => x => Math.min(Math.max(min, x), max);
const clampAfter = curry((min, max, fn) => compose(clamp(min, max), fn));
const limitRank = clampAfter(0, 4);
const over = (key, fn) => modify(mapProps({[key]: fn}))
const getState = key => get(prop(key));
const liftState = fn => compose(
    of,
    fn
)
const getCard = id => getState('cards')
    .map(chain(find(propEq('id', id))))
    .map(option({}))
const getHint = () => getState('hint')
    .map(option({}))
const cardToHint = composeK(
    liftState(omit(['id'])),
    getCard
)
// () -> b
const validateAnswer = converge(
    liftA2(equals),
    cardToHint,
    getHint
)
// b -> ()
const setIsCorrect = b => over('isCorrect', constant(b));

const adjustRank = compose(limitRank, incOrDec);
// b -> ()
const updateRank = b => over('rank', adjustRank(b));

const applyFeedback = converge(
    liftA2(constant),
    setIsCorrect,
    updateRank
)

const feedback = composeK(
    applyFeedback,
    validateAnswer
)

console.log(
    feedback('green-square')
        .execWith(state)
)





















/*
// getState :: String -> State Object (Maybe a)
const getState = key => get(prop(key));

// liftState :: ( a -> b) -> a -> State s b
const liftState = fn => compose(
    of,
    fn // get fn return value pass into State.of
);

// getHint :: () -> State AppState Hint 
const getHint = () => getState('hint')
    .map(option({color: 'yay', shape: 'uwu'}));

// getCard :: String -> State AppState Card
const getCard = (id) => getState('cards')
    .map(chain(find(propEq('id', id)))) // find() return a Maybe, so need to use chain to unfold the value
    .map(option({id: null, color: 'unk', shape: 'unk'}));

// cardToHint :: State AppState Hint     
const cardToHint = composeK(
    liftState(omit(['id'])),
    getCard
)

// setIsCorrect :: Boolean -> State AppState ()    
const setIsCorrect = (b) => modify(mapProps({'isCorrect': constant(b)}));

const validateAnswer = converge(
    liftA2(equals),
    cardToHint,
    getHint
)

const feedback = composeK(
    setIsCorrect,
    validateAnswer
)


/////////////////////////////////////////////////////

const state = {
    cards: [
        {id: 'green-square', color: 'green', shape: 'square'},
        {id: 'orange-square', color: 'orange', shape: 'square'},
        {id: 'blue-triangle', color: 'blue', shape: 'triangle'}
    ],
    hint: {
        color: 'green',
        shape: 'square'
    },
    isCorrect: null
}

console.log(
    feedback('green-square')
        .execWith(state)
)*/