const data = [1,2,3];
const inc = x => x + 1;
const double = x => 2 * x;
const lessThanThree = x => x < 3;
const compose = (...fns) => (...args) => fns.reduce((acc, fn) => [fn.call(null, ...acc)], args)[0]  
////////////////////
/**
 * Problem: We loop over array 3 times! We want to loop over only once
 * in order to improve the profermance.
 */
const res1 = data
    .filter(lessThanThree)
    .map(double)
    .map(inc)

console.log(res1)    // [3,5]

////////////////////////////////
/**
 * Problem: it is not pure function and we do mutation. But it is faster
 * than we do .filter.map.map style, because it only loop the array once.
 */
let res2 = [];
data.forEach((x) => {
    let item;
    if (lessThanThree(x)) {
        item = inc(double(x))
        res2.push(item);
    }
})
console.log(res2)    // [3,5]

////////////////////////////////
/**
 * Good: We avoid the mutation and can be write as pure function and it only loop once!
 * Problem: But we lose our function composion style! We still want .filter.map.map styling.
 * Meanwhile it should be profermance wise.
 */
const res3 = data.reduce((acc, curr) => {
    if (lessThanThree(curr)) {
        acc.push(inc(double(curr)));
    }
    return acc;
}, []);
console.log(res3);    // [3,5]


////////////////////////////////////
//data.reduce(reducer, seed), reducer is something we can compose!
//Because reducer :: (acc, curr) => acc
//For every reducer functions' signature are the same.
//If the function sinature are the same, then we can compose function together!
const _mapReducer = (xf, array) => 
    array.reduce((acc, curr) => {
        acc.push(xf(curr))
        return acc;
    }, []);
const _filterReducer = (xf, array) => 
    array.reduce((acc, curr) => {
        if (xf(curr)) acc.push(curr);
        return acc;
    }, []);
// To make fns easy to compose, we extract 'array' data & init value
const mapReducer = (xf) => ((acc, curr) => {
    acc.push(xf(curr))
    return acc;
});
const filterReducer = pred => ((acc, curr) => {
    if (pred(curr)) acc.push(curr);
    return acc;
});
// now mapReducer and filterReducer both have the same function signature.
console.log(data.reduce(mapReducer(double), [])); // [2,4,6]
console.log(data.reduce(mapReducer(inc), [])); // [2,3,4]
console.log(data.reduce(filterReducer(lessThanThree), []));  // [1,2]

// In order to compose reudcers together we need to make mapReducer and filterReducer as high order functions to take reducer as arguement
// Take a reducer as input and return a reducer signature as output is the key to do composion!
const map = xf => reducer => ((acc, curr) => {
    acc = reducer(acc, xf(curr))
    return acc;
});
const filter = pred => reducer => ((acc, curr)=> {
    if (pred(curr)) acc = reducer(acc, curr) 
    return acc;
})
// For mapReducer and filterReducer, we both do acc.push()
// therefore we can extrat this as base reducer
const pushReducer = (acc, value) => {
    acc.push(value);
    return acc;
};
 
/**
 * Now we are able to use functional style and loop the array only once!s
 */
const doulbeLessThanThree = compose(
    map(inc),
    map(double),
    filter(lessThanThree)
)
const res5 = data.reduce(doulbeLessThanThree(pushReducer),  []);
console.log(res5); // [3,5]

////////////////////////////////////
// Define our transducer!
/**
 * transducer :: ((a, b), (a, b), m a, m a) -> m a
 * @param {*} xf: base reducer 
 * @param {*} reducer: the composion redcuer signature
 * @param {*} seed : init value
 * @param {*} collection : data
 */
const transducer = (xf, reducer, seed, collection) => {
    return collection.reduce(reducer(xf), seed);
}
const res6 = transducer(pushReducer, doulbeLessThanThree, [], data);
console.log(res6);