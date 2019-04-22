const log = require("./log");
const R = require("ramda");
const { curry, fanout, merge, reduce, compose } = require("crocks");

const sum = reduce(R.add, 0);
// divideByLen :: [Number] -> Number -> Number
const divideByLen = curry(
  compose(
    R.flip(R.divide),
    R.length
  )
);
/*
const avg = list => {
    let sum = 0;
    for(let i = 0; i < list.length; i++) {
        sum += list[i]
    }
    return sum / list.length
}

// Currying
const avg = list =>
  compose(
    divideByLen(list),
    sum
  )(list);*/

// Partial Application
// Ramda
// const avg = R.converge(R.divide, [R.sum, R.length]);

// crocks
const avg = compose(
  merge(R.divide),
  fanout(R.sum, R.length)
);

const numbers = [54, 12, 78, 4, 2];

log(avg(numbers));
