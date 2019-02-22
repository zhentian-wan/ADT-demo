const {isNil, path, not} = require('ramda');
/////////////////////////

const Just = x => ({
    chain: f => f(x),
    map: f => Just(f(x)),
    inspect: () => `Just ${x}`,
    option: (_) => x,
})

const Nothing = x => ({
    chain: f => 'Nothing',
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
const safe = pred => x => pred(x) ? Maybe.Just(x): Maybe.Nothing();
const safeNum = safe(isNumber);
const safeString = safe(isString);


const prop = pred => propName => obj => safe(pred)(obj[propName]);
const propPath = p => obj => safe(isNotNil)(path(p, obj));

const safeProp = prop(isNotNil);
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

const inputS = safeString('test')
const resultS = inputS.map(toUpper).option('')

console.log(resultS)

const obj = {age: 23, name: 'Wan'};
const safeAge = prop(isNumber)('age');
const inputO = safeAge(obj).map(inc).option(1);

console.log(inputO)
const getAddress = propPath(['address', 'postalCode']);
const nestedObj = {age: '23', name: 'Wan', address: {postalCode: 123456}};
const resultNO = getAddress(nestedObj).option('not available');
console.log(resultNO)

const responseObj = {body: {age: '23', name: 'Wan', address: {postalCode: 123456789}}};
const getResponse = (obj) => Promise.resolve(safeProp('body')(obj));

getResponse(responseObj)
        .then(res => res.chain(getAddress))
        .then(res => console.log(res.option('not available')))
