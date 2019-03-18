const {gt, lte, gte} = require('ramda');

const {and, safe, option, flip, curry, compose, map, constant} = require('crocks');

// taggedPred :: (b, (a - Boolean))
// taggedPreds :: [taggedPred]
const taggedPreds = [
    ['Sml', flip(lte, 50)],
    ['Med', and(flip(gt, 50), flip(lte, 100))],
    ['Lrg', flip(gt, 100)]
];

// tagValue :: taggedPred -> a -> Maybe b
const tagValue = curry(([tag, pred]) =>
    compose(map(constant(tag)), safe(pred)));

console.log(
    tagValue(taggedPreds[2], 100)
)

