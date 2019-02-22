const {prop,assoc, pick, bimap, State, identity, omit, curry, filter, fanout, converge,map, composeK, liftA2, equals, constant,option, chain, mapProps, find, propEq, isNumber, compose, safe} = require('crocks');
const  {get, modify, of} = State; 

// #region generateCards
const state = {
    colors: [ 'orange', 'green', 'blue', 'yellow' ],
    shapes: [ 'square', 'triangle', 'circle' ]
};

const getState = key => get(prop(key))
const getColors = () => getState('colors').map(option([]))
const getShapes = () => getState('shapes').map(option([]))
const buildCard = curry((color, shape) => ({
    id: `${color}-${shape}`,
    color,
    shape
}));
const buildCards = liftA2(buildCard)
const generateCards = converge(
    liftA2(buildCards),
    getColors,
    getShapes
)
// #endregion

// Splite Cards into two pars
//[Selected Cards] - [UnSelected Cards]

const getAt = index => array => array[index];
const unsetAt = index => array => ([...array.slice(0, index), ...array.slice(index + 1)]);
// Deck :: Pair [Card] [Card]
// drawCardAt :: Integer -> [Card] -> Deck
const drawCardAt = index => compose(
    bimap(Array.of, identity),
    fanout(
        getAt(index),
        unsetAt(index)
    )
)

console.log(
    generateCards()
        .map(drawCardAt(0))
        .map(chain(drawCardAt(2)))
        .map(chain(drawCardAt(3)))
        .map(chain(drawCardAt(4)))
        .evalWith(state).fst() 
) /**
[ { id: 'orange-square', color: 'orange', shape: 'square' },
  { id: 'green-square', color: 'green', shape: 'square' },
  { id: 'green-circle', color: 'green', shape: 'circle' },
  { id: 'blue-triangle', color: 'blue', shape: 'triangle' } ]
*/

console.log(
    generateCards()
        .map(drawCardAt(0))
        .map(chain(drawCardAt(2)))
        .map(chain(drawCardAt(3)))
        .map(chain(drawCardAt(4)))
        .evalWith(state).snd()
    
)
/** 
[ { id: 'orange-triangle', color: 'orange', shape: 'triangle' },
  { id: 'orange-circle', color: 'orange', shape: 'circle' },
  { id: 'green-triangle', color: 'green', shape: 'triangle' },
  { id: 'blue-square', color: 'blue', shape: 'square' },
  { id: 'blue-circle', color: 'blue', shape: 'circle' },
  { id: 'yellow-square', color: 'yellow', shape: 'square' },
  { id: 'yellow-triangle', color: 'yellow', shape: 'triangle' },
  { id: 'yellow-circle', color: 'yellow', shape: 'circle' } ]
*/

