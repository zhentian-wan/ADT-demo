const {gt, lte} = require('ramda');

const {First, mreduceMap, and, safe, option, flip, objOf, assoc,
    merge, fanout, curry, compose, map, constant} = require('crocks');


const getSmlPred = and(flip(gt, -1), flip(lte, 50));
const getMedPred = and(flip(gt, 50), flip(lte, 100));
const getLrgred =  flip(gt, 100);
// taggedPred :: (b, (a -> Boolean))
// taggedPreds :: [taggedPred]
/*const taggedPreds = [
    ['Sml', getSmlPred],
    ['Med', getMedPred],
    ['Lrg', getLrgred]
];*/
const taggedPreds = require('./data.js');
// tagValue :: taggedPred -> a -> Maybe b
const tagValue = curry(([tag, pred]) => compose(
    map(constant(tag)),
    safe(pred)
));    

// match :: [ taggedPreds ] -> a -> Maybe b
const match = 
    flip(x => mreduceMap(First, flip(tagValue, x)));  
const matchNumber = match(taggedPreds);

const tagCard = fanout(compose(option(' | '), matchNumber), objOf('number'));

const cardFromNumber = compose(
    merge(assoc('type')),
    tagCard
)

console.log(
    cardFromNumber('4026-xxxx-xxxxx-xxxx')
) // { number: '4026-xxxx-xxxxx-xxxx', type: 'Visa Electron|visa' }