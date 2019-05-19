const {
  Async,
  Result,
  resultToAsync,
  identity,
  isNumber,
  tryCatch
} = require("crocks");

const { Resolved } = Async;

const { Err, Ok } = Result;

// log :: String -> a -> a
const log = label => x => (console.log(`${label}:`, x), x);

// notNumber :: a -> Number
function notNumber(x) {
  if (!isNumber(x)) {
    throw new TypeError("Must be a Number");
  }
  return x;
}

// safeFail :: a -> Result TypeError Number
const safeFail = tryCatch(notNumber);

resultToAsync(Ok(99)).fork(log("rej"), log("res"));
//=> res: 99

resultToAsync(Err("Not Good")).fork(log("rej"), log("res"));
//=> rej: "Not Good"

Resolved(103)
  .chain(resultToAsync(safeFail))
  .bimap(x => x.message, identity)
  .fork(log("rej"), log("res"));
//=> res: 103

Resolved("103")
  .chain(resultToAsync(safeFail))
  .bimap(x => x.message, identity)
  .fork(log("rej"), log("res"));
//=> rej: "Must be a Number"

Resolved(Err("Invalid entry"))
  .chain(resultToAsync)
  .fork(log("rej"), log("res"));
//=> rej: "Invalid entry"

Resolved(Ok("Success!"))
  .chain(resultToAsync)
  .fork(log("rej"), log("res"));
// => res: "Success!"
