const {Pred, chain, compose, equals,
       mconcatMap, merge, option, or,
       prop, safe, isFunction, isSameType,
       toPairs, unless} = require('crocks');

const predOrEq = unless(
    or(isFunction, isSameType(Pred)), // When it is not a function or not a Pred monoid
    equals // then just check whether values are equal.
)

// propSatisfies :: (String, a -> boolean) -> Object -> Boolean
const propSatisfies = (key, pred) => compose(
    option(false),
    chain(safe(predOrEq(pred))),
    prop(key)
)

// where :: Object -> Object -> Boolean
// toPairs will turns {id: xxx, name: xxx} into
// Pair(id, xxx), Pair(name, xxx)
// Then inside merge will pass 'id' as key and 'xxx' as pred to propSatisfies
const where = compose(
    mconcatMap(Pred, merge(propSatisfies)),
    toPairs
)

const test = where({
    id: 32,
    name: 'Joey'
})

const test2 = where({
    id: x => x > 40,
    name: equals('Wan')
})

console.log(
    test.runWith({
        id: 32, name: 'Joey'
    })
) // true

console.log(
    test2.runWith({
        id: 12, name: 'Wan'
    })
) // false