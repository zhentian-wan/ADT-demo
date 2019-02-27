const {curry} = require('ramda');
const {Maybe, Identity, prop} = require('crocks');

const { Just, Nothing } = Maybe

const liftA2 = curry((g, f1, f2) => f1.map(g).ap(f2));
const liftA3 = curry((g, f1, f2, f3) => f1.map(g).ap(f1).ap(f2).ap(f3));

const user = {
    name: 'John Doe',
    email: 'blurp_blurp',
};

const profile = name => email => `${name}__${email}`;
const safeProfile = liftA2(profile);
const res1 = safeProfile(prop('name', user), prop('email', user)); // John Doe__blurp_blurp
// map = of/ap
const res2 = prop('name', user).map(profile).ap(prop('email', user)); // John Doe__blurp_blurp

console.log(res1.option() === res2.option()); // true

//// identity
//A.of(id).ap(v) === v;
const v = Identity.of('Pillow Pets');
const id = x => x;
console.log(Identity.of(id).ap(v), v, Identity.of('Pillow Pets').map(id)); // all three are the same
