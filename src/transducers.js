const { isObject, isArray } = require('crocks');
const { toPairs } = require('ramda');

const data = [1,2,3];
const inc = x => x + 1;
const double = x => 2 * x;
const lessThanThree = x => x < 3;
const toUpper = s => s.toUpperCase();
const isVowel = char => ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase());
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
 * transducer :: ((a -> b -> a), (a -> b -> a), [a], [a]) -> [a]
 * @param {*} xf: base reducer
 * @param {*} reducer: the composion redcuer signature
 * @param {*} seed : init value
 * @param {*} collection : data
 */
const _transducer = (xf, reducer, seed, collection) => {
    return collection.reduce(xf(reducer), seed);
}
const res6 = _transducer(doulbeLessThanThree, pushReducer, [], data);
console.log(res6); // [3,5]

const transducer = (xf, reducer, seed, collection) => {
    let acc = seed;

    collection = isObject(collection) ? toPairs(collection): collection

    const transformReducer = xf(reducer);
    for (let curr of collection) {
        acc = transformReducer(acc, curr)
    }

    return acc;
}

const res7 = transducer(
    compose(filter(isVowel), map(toUpper)),
    (acc, curr) => acc + curr,
    '',
    'transducer'
);
console.log("7", res7); // AUE


const numMap = new Map()
numMap.set('a', 1);
numMap.set('b', 2);
numMap.set('c', 3);
numMap.set('d', 4);
const res8 = transducer(
    doulbeLessThanThree,
    pushReducer,
    [],
    numMap.values()
);
console.log("8", res8); // [3,5]

/**
 * into helper
 * transducer = (xf, reducer, seed, colllection)
 * Until so far, we have to know what kind of base reducer we need to use
 * for example, push reduer for array, concat reducer for string...
 *
 * The idea of into helper is to let transducer to figure out what reducer
 * we want to use automaticlly instead of we telling transducer which one to use
 *
 *  into:: (to, xf, collection)
 */

const objectReducer = (obj, value) => Object.assign(obj, value);
const into = (to, xf, collection) => {
     if (Array.isArray(to)) {
        return transducer(xf, pushReducer, to, collection);
     } else if (isObject(to)) {
        return transducer(xf, objectReducer, to, collection)
     }
     throw new Error('into only supports arrays and objects as `to`');
 }

 /**
  * seq helper
  * Different from into help, seq helper will infer the collection type
  */
const seq = (xf, collection) => {
    if (isArray(collection)) {
       return transducer(xf, pushReducer, [], collection);
    } else if (isObject(collection)) {
       return transducer(xf, objectReducer, {}, collection)
    }
    throw new Error('seq : unsupport collection type');
}
console.log(seq(compose(
    filter(x => x < 5),
    map(x => x * 2)
), [1,2,3]));

const filp = map(([k, v]) => ({[v]: k}));
console.log(seq(filp, {one: 1, two: 2})); /**{1: 'one, 2: 'two'} */
