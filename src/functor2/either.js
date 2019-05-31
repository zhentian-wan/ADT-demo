const log = require("./log");
const { add, err } = require("./helpers");

const Right = x => ({
  map(fn) {
    return Right(fn(x));
  },
  fold(f, g) {
    return g(x);
  },
  inspect() {
    return `Right(${x})`;
  }
});

const Left = x => ({
  map(fn) {
    return Left(x);
  },
  fold(f, g) {
    return f(x);
  },
  inspect() {
    return `Left(${x})`;
  }
});

const fromNullable = x => (x != null ? Right(x) : Left(null));

const findColor = name =>
  fromNullable({ red: "#ff4444", blue: "#3b5998", yellow: "#fff68f" }[name]);

log(findColor("blue").fold(err, add));
