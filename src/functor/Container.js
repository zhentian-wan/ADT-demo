const {curry} = require('ramda');

const plusTwo = x => x + 2;
const toUpper = s => s.toUpperCase();
const append = x => y => `${y} ${x}`;
const prop = propName => obj => obj[propName];
const match = reg => s => s.match(reg);
const compose = (...fns) => (...args) => fns.reduceRight((acc, fn) => [fn.call(null, ...acc)], args)[0]

class Container {
    constructor(x) {
        this.$value = x;
    }

    static of (x) {
        return new Container(x)
    }
}

Container.prototype.map = function (f) {
    return Container.of(f(this.$value));
}
Container.prototype.chain = function (f) {
    return f(this.$value);
}

console.log(Container.of(2).map(plusTwo)) // Container { '$value': 4 }
console.log(Container.of('flamethrowers').map(toUpper)) // Container { '$value': 'FLAMETHROWERS' }
console.log(Container.of('bombs').map(append(' away')).map(prop('length')))

class Maybe {
    constructor(x) {
        this.$value = x;
    }
    static of (x) {
        return new Maybe(x)
    }
    get isNothing () {
        return this.$value === null || this.$value === undefined;
    }
    map (fn) {
        return this.isNothing ? this : Maybe.of(fn(this.$value));
    }
    inspect() {
        return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
    }
}

// map :: Functor f => (a -> b) -> f a -> f b
const map = fn => anyFunctor => anyFunctor.map(fn);

console.log(Maybe.of('Malkovich Malkovich').map(match(/a/ig)))
console.log(Maybe.of(null).map(match(/a/ig))); // null

console.log(compose(map(toUpper), Maybe.of)('Test'))

// safeHead :: Maybe m => xs -> m a
const safeHead = xs => Maybe.of(xs[0]);
// streetName :: object -> Maybe string
const streetName = compose(map(prop('street')), safeHead, prop('addresses'));
console.log(streetName({addresses: []}));
console.log(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }));
// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, {balance}) =>
    Maybe.of(balance >= amount ? {balance: balance - amount}: null));

// updateLedger :: Account -> Account
const updateLedger = account => account;

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is $${balance}`;
// finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger);
// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(
    map(finishTransaction),
    withdraw(20)
)
console.log(getTwenty({ balance: 200.00 }))
console.log(getTwenty({ balance: 10.00 }))

console.log('*******')
const add = a => b => a +b;
const res = Container.of(2).chain(two =>  Container.of(3).map(add(two)));
console.log(Container.of(add(2)));