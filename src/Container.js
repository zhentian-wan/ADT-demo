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
    inspest () {
        return this.isNothing ? 'Nothing' : `Just ${this.$value}`
    }
}

// map :: Functor f => (a -> b) -> f a -> f b
const map = fn => anyFunctor => anyFunctor.map(fn);

console.log(Maybe.of('Malkovich Malkovich').map(match(/a/ig)))
console.log(Maybe.of(null).map(match(/a/ig))); // null

console.log(compose(map(toUpper), Maybe.of)('Test'))