
const {prop, isSameType, State, omit, curry, converge,map, composeK, liftA2, equals, constant,option, chain, mapProps, find, propEq, isNumber, compose, safe} = require('crocks');
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
const clampAfter = curry((min, max, fn) => compose(clamp(min, max), fn))
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
const validateAnswer = converge(
    liftA2(equals),
    cardToHint,
    getHint
)
const setIsCorrect = b => over('isCorrect', constant(b));
const adjustRank = compose(limitRank, incOrDec);
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
// Action a :: {type: string, payload: a}
// createAction :: String -> a -> Action a
const createAction = type => payload => ({type, payload});
const SELECT_CARD = 'SELECT_CARD';
const selectCard = createAction(SELECT_CARD);

const reducer = (prevState, {type, payload}) => {
    let result;
    switch(type) {
        case SELECT_CARD:
            result = feedback(payload);
            break;
        default: 
            result = null;   
    }

    return isSameType(State, result) ? result.execWith(prevState): prevState;
}

const sillyVerb = createAction('SILLY_VERB');

console.log(
    reducer(
        state,
        selectCard('green-square')
    )
)