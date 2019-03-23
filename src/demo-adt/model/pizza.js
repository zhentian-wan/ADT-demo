const log = require('../lib/log');

const Arrow = require('crocks/Arrow');
const chain = require('crocks/pointfree/chain');
const compose = require('crocks/helpers/compose');
const composeS = require('crocks/helpers/composeS');
const concat = require('crocks/pointfree/concat');
const isString = require('crocks/predicates/isString');
const map = require('crocks/pointfree/map');
const objOf = require('crocks/helpers/objOf');
const option = require('crocks/pointfree/option');
const prop = require('crocks/Maybe/prop');
const safe = require('crocks/Maybe/safe');

// dough : Arrow [ String ]
const dough = Arrow(concat(['dough']));

// sauce : Arrow [ String ]
const sauce = Arrow(concat(['sauce']));

// cheese : Arrow [ String ]
const cheese = Arrow(concat(['cheese']));
/*
const cheesePizza =
    dough
        .compose(sauce)
        .compose(dough)
*/
const cheesePizza = composeS(
    dough,
    sauce,
    cheese,
);

// cookPizza : {raw: a} -> {cooked: b}
const cookPizza = compose(
    option({}),
    map(objOf('cooked')),
    prop('raw')
);
// contramap : (a -> c)-> f c b -> f a b
// Arrow : [] --contramap--> {raw: []} -> {cooked: []}
const oven =
    Arrow(cookPizza)
    .contramap(objOf('raw'))

log(
    cheesePizza
        .compose(oven)
        .runWith([])
)

const getName = compose(
    option('no name'),
    chain(safe(isString)),
    prop('name')
)
const arrUpper = Arrow(
    str => str.toUpperCase()
)
const nameUpper = arrUpper
    .contramap(getName)

log(
    nameUpper.runWith('zhentian')
) // ZHENTIAN