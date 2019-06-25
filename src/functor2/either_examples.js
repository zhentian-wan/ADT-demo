const {Maybe,map, option, prop, propPath, pipe, Either, chain, safe, isString, compose, not, isNil, ifElse} = require('crocks')

const user = {
    address: {
        street: {
            name: 's123'
        }
    }
}



const safeAddress = compose(
    option('no name'),
    map(s => s + '!'),
    propPath(['address', 'street', 'name'])
);

console.log(safeAddress(user));