const log = console.log;

// zero :: &fa.a
const zero = f => x => x; // zero is F
// once :: &fa.fa
const once = f => x => f(x); // once it I
// twice :: &fa.f(fa)
const twice = f => x => f(f(x));
// thrice :: &fa.f(f(fa))
const thrice = f => x => f(f(f(x)));

const T = true;
const F = false;
const I = x => x;
const not = x => !x;
const K = x => y => x

log(zero(not)(T)) // true, because only return second arguement
log(once(not)(T)) // false
log(twice(not)(F)) // false
log(thrice(not)(T)) // false

log('****')

/** SUCCSOR
SUCC N1 = N2
SUCC N2 = N3
SUCC(SUCC N1) = N3

SUCC &fa.fa = &fa.f(fa)
SUCC N2, then n is 2, do f n times, then add one f more
*/
const _succ = n => f => x => f(n(f)(x));
// conver chunch number to JS number.
// jsnum :: take a chunch number, call (x => x + 1) n times, and start from 0.
const jsnum = n => n(x => x + 1)(0);
log(_succ(zero)(not)(T)) // false
log(jsnum(_succ(zero))) // 1
log(jsnum(_succ(_succ(zero)))) // 2

const n0 = zero;
const n1 = once;
const n2 = twice;
const n3 = thrice;
const n4 = _succ(thrice);

log(jsnum(_succ(n2))) // 3

const B = f => g => a => f(g(a));

const succ = n => f => B(f)(n(f));
// Add N1 N4 = succ(N4)
// Add N2 N4 = succ(succ(N4))
// Add N3 N4 = succ(succ(succ(N4)))
// Add N3 N4 = (succ.succ.succ) N4 === N3 succ N4
const add = n => k => n(succ)(k);
console.log(jsnum(add(n3)(n4))); // 7

const mult = B; // mult = B
console.log(jsnum(mult(n2)(n3)))

// Thrush $af.fa = CI (Cardinal Idiot, flip the arguements)
const pow = n => k => k(n);
console.log(jsnum(pow(n2)(n3))); // 8

// isZero :: $n.n(f)(args)
// is n = 0, f won't run, just return args
// Then args should be T
// $n.n(f)(T), now if n > 0, f will be run,
// we want it always return F
// K(F), constant(F)
// $n.n(K(F))(T)
const isZero = n => n(K(F))(T)
console.log(isZero(n0)) // true
console.log(isZero(n1)) // false

const pair = a => b => f => f(a)(b);
const vim = pair(I)(M)