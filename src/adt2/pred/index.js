const log = require('./log')
const {and, flip, hasProp, not, ifElse, isArray, isObject, or, propEq} = require('crocks');
const {add, lt} = require('ramda');

// _isLess :: Number -> Boolean
const _isLess = x => x < 10

// isLessTen :: Number -> Boolean
const isLessTen = flip(lt, 10)

// imperative :: a -> Boolean
const _isArray = x => Object.prototype.toString.call(x) === '[object Array]';
const _isDate = x => Object.prototype.toString.call(x) === '[object Date]';

// declarative :: Number -> Boolean
const issArray = isArray;
const isntArray = not(isArray);

const _aIs100 = x => isObject(x) && x.a === 100;
const aIs100 = and(isObject, propEq('a', 100))

const _aIs100A = x => isObject(x) && x.a === [100];
log(
    _aIs100A({a: [100]})
) // false, because it consider [100] is a new object
const aIs100A = and(isObject, propEq('a', [100]))
log(
    aIs100A({a: [100]}) // true
)

/**
 * Or && And
 */
// Just check one object has length prop is not enough
// Because Array has length, function has length
// Array is also object
const _hasLengthProp = x =>
    (isObject(x) && x.length !== undefined) || isArray(x);

// hasLengthProp :: a -> Boolean
const hasLengthProp = or(isArray, and(isObject, hasProp('length')));
log(hasLengthProp([])) // true

/**
 * ifElse
 */
const diff10 = v => {
    let result = null;
    if (v < 10) {
        result = v + 10
    } else {
        result = v - 10
    }
}

const declarative = ifElse(
    not(flip(lt, 10)), // if the given number is greater than 10
    add(10), // then plus 10
    add(-10) // go negitive
)

log(
    declarative(1)
)