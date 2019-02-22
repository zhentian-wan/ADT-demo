const {prop,assoc, pick, State, identity, omit, curry, filter, converge,map, composeK, liftA2, equals, constant,option, chain, mapProps, find, propEq, isNumber, compose, safe} = require('crocks');
const  {get, modify, of} = State; 
const {lift} = require('ramda');

const state = {
    colors: [ 'orange', 'green', 'blue', 'yellow' ],
    shapes: [ 'square', 'triangle', 'circle' ]
  };

const getState = (key) => get(prop(key))
const getColors = () => getState('colors').map(option([]));
const getShapes = () => getState('shapes').map(option([]));

const buildCard = curry((color, shape) => console.log(color, shape) || ({
    id: `${color}-${shape}`,
    color,
    shape
}));
// buildCards :: [String] -> [String] -> [Card]
const buildCards = liftA2(buildCard);
const generateCards = converge(
    liftA2(buildCards),
    getColors,
    getShapes
)
console.log(
    generateCards()
        .evalWith(state)
)

const build = lift(buildCard);
console.log('build', build([1,2,3], ['c', 'd']))