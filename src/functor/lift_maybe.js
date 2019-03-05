const crocks = require('crocks');
const {liftA2, safeLift, Maybe, safe, isNumber, curry} = crocks;

const safeNum1 = safe(isNumber, 1);
const safeNum2 = safe(isNumber, 2);

const add = curry((a, b) => a + b);

const safeAdd = liftA2(add);
const res = safeAdd(safeNum1, safeNum2);
console.log(res);

const res1 = Maybe.of(add).ap(safeNum1).ap(safeNum2);
console.log(res1);

const mul = curry((a, b) => a * b);
const dbl = mul(2);

const _safeDbl = n => safe(isNumber, n).map(dbl);
const safeDbl = safeLift(isNumber, dbl)
const res2 = safeDbl(4);
console.log(res2);