const {compose} = require('ramda')

class IO {
    // The value we take for IO is always a function!
    static of (x) {
        return new IO(() => x)
    }

    constructor (fn) {
        this.$value = fn;
    }

    map (fn) {
        return new IO(compose(fn, this.$value))
    }
}

// ioWindow :: IO Window
const ioWindow = new IO(() => {innerWidth: 1443});

console.log(ioWindow.map(win => win.innerWidth));

const findParam = key => map(
    compose(
        Maybe.of,
        filter(compose(eq(key), head)),
        params
    ),
    url
);
// validateName :: User -> Either String ()
const validateName = user => Either.of(user.name.length > 3 ? user.name : null)

// register :: User -> IO String
const register = compose(compose(
    map(showWelcome),
    save
), validateUser(validateName));

const validateName = ({ name }) => (name.length > 3
    ? Either.of(null)
    : left('Your name need to be > 3')
  );

  const register = compose(
    either(IO.of, compose(map(showWelcome), save)),
    validateUser(validateName),
  );