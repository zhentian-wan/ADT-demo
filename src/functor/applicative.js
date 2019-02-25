const R = require('ramda');

class Container {
    static of(x) {
        return new Container(x);
    }

    constructor(x) {
        this.$value = x;
    }

    map (fn) {
        return Container.of(fn(this.$value));
    }

    ap (functor) {
        return functor.map(this.$value);
    }

    join() {
        return this.$value; 
    }

    chain(fn) {
        return this.map(fn).join();
    }

    inspect() {
        return `Container(${this.$value})`;
    }
}

class Maybe {
    get isNothing() {
      return this.$value === null || this.$value === undefined;
    }
  
    get isJust() {
      return !this.isNothing;
    }
  
    constructor(x) {
      this.$value = x;
    }
  
    inspect() {
      return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
    }
  
    // ----- Pointed Maybe
    static of(x) {
      return new Maybe(x);
    }
  
    // ----- Functor Maybe
    map(fn) {
      return this.isNothing ? this : Maybe.of(fn(this.$value));
    }
  
    // ----- Applicative Maybe
    ap(f) {
      return this.isNothing ? this : f.map(this.$value);
    }
  
    // ----- Monad Maybe
    chain(fn) {
      return this.map(fn).join();
    }
  
    join() {
      return this.isNothing ? this : this.$value;
    }
  
    // ----- Traversable Maybe
    sequence(of) {
      this.traverse(of, identity);
    }
  
    traverse(of, fn) {
      return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
    }
  }

  const add = a => b => a + b;
  const map = (fn, m) => m.map(fn);
  const notWorking = add(Container.of(2), Container.of(3));
  const containerOfAdd2 = map(add(3), Container.of(2));
  console.log(containerOfAdd2); // Contianer(5)

  const works = Container.of(2).chain(v => Container.of(3).map(add(v)));
  console.log(works); // Contianer(5)

  const ap = Container.of(2).map(add).ap(Container.of(3));
  console.log(ap)

  const ap2 = Container.of(add(2)).ap(Container.of(3));
  console.log(Maybe.of(add).ap(Maybe.of(2)).ap(Maybe.of(3)))
  console.log(Maybe.of(add(2)).ap(Maybe.of(3)))

