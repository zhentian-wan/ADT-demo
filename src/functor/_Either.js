const moment = require('moment');
const {curry} = require('ramda');

const prop = propName => obj => obj[propName];

class Either {
    static of(x) {
      return new Right(x);
    }

    constructor(x) {
      this.$value = x;
    }
  }

  class Left extends Either {
    map(f) {
      return this;
    }

    inspect() {
      return `Left(${this.$value})`;
    }
  }

  class Right extends Either {
    map(f) {
      return Either.of(f(this.$value));
    }

    inspect() {
      return `Right(${this.$value})`;
    }
  }

  const left = x => new Left(x);

  console.log(Either.of('rain').map(str => `b${str}`));
// Right('brain')

console.log(left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`));
// Left('rain')

console.log(Either.of({ host: 'localhost', port: 80 }).map(prop('host')));
// Right('localhost')

console.log(left('rolls eyes...').map(prop('host')));
// Left('rolls eyes...')


// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD');

  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birth date could not be parsed');
});

console.log(getAge(moment(), { birthDate: '2005-12-12' }))
// Right(9)

console.log(getAge(moment(), { birthDate: 'July 4, 2001' }))

// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
    let result;

    switch (e.constructor) {
      case Left:
        result = f(e.$value);
        break;

      case Right:
        result = g(e.$value);
        break;

      // No Default
    }

    return result;
  });

