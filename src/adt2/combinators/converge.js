const Maybe = require('crocks/Maybe')
const alt = require('crocks/pointfree/alt')
const converge = require('crocks/combinators/converge')
const prop = require('crocks/Maybe/prop')

const {Just} = Maybe;

// maybeGetDisplay :: a -> Maybe b
const maybeGetDisplay = prop('display')

// maybeGetFirst :: a -> Maybe b
const maybeGetFirst = prop('first')

// maybeGetLast :: a -> Maybe b
const maybeGetLast = prop('last')

// maybeConcatStrings :: Maybe String -> Maybe String -> Maybe String
const maybeConcatStrings = x => y => Just(x => y => x + ' ' + y).ap(x).ap(y).alt(x).alt(y)

// maybeMakeDisplay :: a -> Maybe String
const maybeMakeDisplay = converge(maybeConcatStrings, maybeGetFirst, maybeGetLast)

// maybeGetName :: a -> Maybe b
const maybeGetName = converge(alt, maybeGetDisplay, maybeMakeDisplay)

console.log(maybeMakeDisplay({ display: 'Jack Sparrow' }))
//=> Just('Jack Sparrow')

console.log(maybeMakeDisplay({ first: 'J', last: 'S' }))
//=> Just('J S')

console.log(maybeMakeDisplay({ display: 'Jack Sparrow', first: 'J', last: 'S' }))
//=> Just('Jack Sparrow')

console.log(maybeMakeDisplay({ first: 'J' }))
//=> Just('J')

console.log(maybeGetName({ last: 'S' }))
//=> Just('S')
