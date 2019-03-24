const log = require('../lib/log');

const Arrow = require('crocks/Arrow');
const branch = require('crocks/Pair/branch');
const chain = require('crocks/pointfree/chain');
const compose = require('crocks/helpers/compose');
const composeS = require('crocks/helpers/composeS');
const concat = require('crocks/pointfree/concat');
const isString = require('crocks/predicates/isString');
const map = require('crocks/pointfree/map');
const merge = require('crocks/pointfree/merge');
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
const cookPizza = def => compose(
    map(objOf('cooked')),
    prop('raw')
)(def);

const package = x => [x];

// contramap : (a -> c)-> f c b -> f a b
// Arrow : [] --contramap--> {raw: []} -> {cooked: []}
const oven =
    Arrow(cookPizza)
    .second() // 'Pair( { raw: "teeth" }, Just { cooked: "teeth" } )'
    .contramap(branch)
    .map(merge(option)) // { cooked: "teeth" }

log(
    oven
        .runWith({raw: 'teeth'})
)