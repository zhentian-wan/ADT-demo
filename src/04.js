const {prop, State, omit, converge,map, composeK, liftA2, equals, constant,option, chain, mapProps, find, propEq, isNumber, compose, safe} = require('crocks');
const  {get, modify, of} = State; 

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
)






























/*
// getState :: String ->  State Object (Maybe a)
const getState = key => get(prop(key))

const findById = id => find(propEq('id', id));

// getCard :: String -> State Object Card
const getCard = id => getState('cards')
    .map(chain(findById(id)))
    .map(option({id: 'urk', color: '', shape: ''}))

// getHint -> State Object hint   
const getHint = () => getState('hint').map(option({
    color: 'yay',
    shape: 'wow'
}));

const isCorrect = (b) => constant(b);
const setIsCorrect = b=> modify(mapProps({'isCorrect': isCorrect(b)}));
const liftState = fn => compose(of, fn);
const cardToHint = composeK(
    liftState(omit(['id'])), 
    getCard
); 

// validateAnswer:: String -> State AppState Boolean
const validateAnswer = converge(
    liftA2(equals),
    getHint,
    cardToHint
)

const answer = composeK(
    setIsCorrect,
    validateAnswer
)

console.log(
    answer('blue-square')
        .execWith(state)
    );*/