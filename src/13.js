
const {prop, execWith, applyTo, isSameType, State, when, assign, omit, curry, converge,map, composeK, liftA2, equals, constant,option, chain, mapProps, find, propEq, isNumber, compose, safe} = require('crocks');
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
    rank: 4,
    left: 8,
    moves: 0
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
const limitMoves = clampAfter(0, 8);
const decLeft = () => over("left", limitMoves(dec));
const incMoves = () => over("moves", limitMoves(inc));
const assignBy = (pred, obj) =>
  when(pred, assign(obj));
const applyMove =
  composeK(decLeft, incMoves)

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
const markSelected = id =>
  assignBy(propEq('id', id), { selected: true })
const selectCard = id =>
  over('cards', map(markSelected(id)))
const answer = composeK(
    applyMove,
    selectCard
) 
const feedback = composeK(
    applyFeedback,
    validateAnswer
)

// Action a :: {type: string, payload: a}
// createAction :: String -> a -> Action a
const createAction = type => payload => ({type, payload});
const SELECT_CARD = 'SELECT_CARD';
const SHOW_FEEDBACK = 'SHOW_FEEDBACK';
const selectCardAction = createAction(SELECT_CARD);
const showFeedbackAction = createAction(SHOW_FEEDBACK);

const createReducer = actionReducer => ({type, payload}) => 
    prop(type, actionReducer)  // safe check type exists on actionReducer
        .map(applyTo(payload)) // we get back a function need to call with payload, using applyTo 
const turn = createReducer({
    SELECT_CARD: answer,
    SHOW_FEEDBACK: feedback
}) 

const reducer = (prevState, action) => {
    return turn(action)
        .chain(safe(isSameType(State))) // check result is the same type as State
        .map(execWith(prevState))       // run with execWith
        .option(prevState);             // unwrap Just and provide default value
    
};

const sillyVerb = createAction('SILLY_VERB');

console.log(
    reducer(
        state,
        selectCardAction('green-square')
    )
)
