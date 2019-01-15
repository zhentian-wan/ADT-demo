const {prop, State, converge, liftA2, equals, constant,option, chain, mapProps, find, propEq, isNumber, compose, safe} = require('crocks');
const  {get, modify} = State; 

const state = {
    cards: [
        {id: 'green-square', color: 'green', shape: 'square'},
        {id: 'orange-square', color: 'orange', shape: 'square'},
        {id: 'blue-square', color: 'blue', shape: 'triangle'}
    ],
    hint: {
        color: 'green',
        shape: 'square'
    },
    isCorrect: null
}

// getState :: String ->  State Object (Maybe a)
const getState = key => get(prop(key))

const findById = id => find(propEq('id', id));

// getCard :: String -> State Object Card
const getCard = id => get(prop('cards'))
    .map(chain(findById(id)))
    .map(option({id: 'urk', color: '', shape: ''}))

const getCard2 = (id) => compose(option({}), chain(findById(id)), prop('cards'))    

const getHint = () => getState('hint').map(option({
    color: 'yay',
    shape: 'wow'
}));

const setIsCorrect = isCorrect => modify(mapProps({'isCorrect': constant(isCorrect)}))

const validateAnswer = converge(
    liftA2(equals),
    getHint,
    getCard
)


const res = getCard('green-square') 
    .evalWith(state)  // { id: 'green-square', color: 'green', shape: 'square' }

const res1 = get(getCard2('green-square'))  //{ id: 'green-square', color: 'green', shape: 'square' } 
    .evalWith(state)

const res2 = getHint()
    .evalWith(state); // { color: 'green', shape: 'square' }
/*console.log(res)
console.log(res1)
console.log(res2)

const res3 = setIsCorrect(true)
    .execWith(state)
    console.log(res3)*/

const res4 = validateAnswer('')
    .execWith(state);
    
console.log(res4)    

