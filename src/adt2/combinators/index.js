const {constant, curry, compose, when, isNil, objOf} = require('crocks')
const {add, multiply} = require('ramda')
const log = require('./log')
// K (constant) :: a -> b -> a
const K = curry(
    x => () => x
)

/**
 * The function will take a input a'
 *
 * a' will be pass to first and second functions at the same time
 * (a' -> b -> c), (a' -> b)
 *
 * Then it takes the result of second function
 * (a' -> b')
 * pass it to first function
 * (a' -> b' -> c)
 * then return us value c
 */
// S (substitution) :: (a -> b -> c) -> (a -> b) -> a' -> c
const S = curry(
    (f, g, x) => curry(f)(x, g(x))
)

// I (identity) :: a -> a
// const I = x => x;
// Second K will be ignore, put here just for the sigurate
// you can even do S(K, S), since second function should be unary
// we choose to put K as second params
const I = S(K, K)

// KI (kite) :: a -> b -> b
// Always return second one
/*const KI = curry(
    () => x => x
)*/
const KI = K(I)

// KI(10, 100) // 100
// KI = K(S(K), K)

// B (composeB) :: (b -> c) -> (a -> b) -> a -> c
/*const B = curry(
    (f, g, x) => f(g(x))
)*/
const B =
    S(K(S), K)

// E (eagle) :: (a -> d -> e) -> a -> (b -> c -> d) -> b -> c -> e
// f : (a -> d -> e)
// y : a
// g : (b -> c -> d)
// z : b
// x : c
// const E = B(B(B, B))
const E = curry(
    (f, y, g, z) => x => curry(f)(y, curry(g)(z, x))
)
// function f, curry it, curry(f)
// take a, curry(f)(y)
// then function g, curry it curry(f)(y, curry(g)
// then b, curry(f)(y, curry(g)(z))
// last take data c, curry(f)(y, curry(g)(z, x))

const defaultValue =
    x => when(isNil, K(x)) // if isNil return true, then run K(), if false, then return the original value

const default4 =
    defaultValue(4)

const doMath =
    B(add(10), multiply(5))

const doMath2 =
    E(add, 10, multiply, 5)

const result =
    B(
        objOf('result'),
        doMath2
    )

log(result(10)); // { result: 60 }


