const R = require('ramda');

// Sum :: Sum s => a -> s a
const Sum = x => ({
    x,
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum ${x}`
})
const res1 = Sum(11).concat(Sum(12)).concat(Sum(2));
console.log(res1); // {x: 25}

// All :: All s => b -> s b
const All = x => ({
    x,
    concat: ({x: y}) => All(y && x),
    inspect: () => `All ${x}`
});
// Any :: Any s => b -> s b
const Any = x => ({
    x,
    concat: ({x: y}) => Any( y || x),
    inspect: () => `Any ${x}`
})
const res2 = All(false).concat(All(true));
console.log(res2) // All false

// First :: First f => a -> f a
const First = x => ({
    x,
    concat: (_) => First(x),
    inspect: () => `First ${x}`
})

const res3 = First('a').concat(First(2)).concat(First(2));
console.log(res3) // 'a'


const _acct1 = {name: 'Nico', isPaid: true, points: 10, friends: ['Franklin']};
const _acct2 = {name: 'Nico', isPaid: false, points: 30, friends: ['Gatsby']};

// Map :: Map m => a -> m a
const Map = x => ({
    x,
    concat: ({x: y}) => Object.keys(y).map(k => y[k].concat(x[k]))
});
const transformations = R.evolve({
    name: First,
    isPaid: All,
    points: Sum
});
const semi_transform = R.compose(
    Map,
    transformations
);
const acct1 = semi_transform(_acct1);
const acct2 = semi_transform(_acct2);
const res4 = acct1.concat(acct2);
console.log(res4); // [ First Nico, All false, Sum 40, [ 'Gatsby', 'Franklin' ] ]