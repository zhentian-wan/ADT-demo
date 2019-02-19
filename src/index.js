const {isNil, not} = require('ramda');

const Just = x => ({
    map: f => Just(f(x)),
    inspect: () => `Just ${x}`,
    option: (_) => x,
})

const Nothing = x => ({
    map: f => Nothing('Nothing'),
    inspect: () => `${x}`,
    option: defVal => defVal
})

const Maybe = {
    Just,
    Nothing
}
const compose = (...fns) => (...args) => fns.reduceRight((acc, fn) => [fn.call(null, ...acc)], args)[0];

const isNotNil = compose(not, isNil);
const isNumber = num => typeof num === 'number';
const isString = str => typeof str === 'string';
const safe = pred => x => pred(x) ? Just(x): Nothing();
const safeNum = safe(isNumber);
const safeString = safe(isString);


const prop = propName => obj => safe(isNotNil)(obj[propName]);
/////////////////////////

const inc = n => n + 1;
const dbl = n => n * 2;
const toUpper = str => str.toUpperCase();

/////////////////////////

const dblAfterInc = compose(
    dbl,
    inc
);

////////////////////////

const inputN = safeNum(4)
const resultN = inputN.map(dblAfterInc).option(0)

console.log(resultN)

const inputS = safeString({})
const resultS = inputS.map(toUpper).option('')

console.log(resultS)

const obj = {age: 23, name: 'Wan'};
const safeAge = prop('age');
const inputO = safeAge(obj).map(inc).option(1);

console.log(inputO)