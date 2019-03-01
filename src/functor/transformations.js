const Either = require('data.either');
const {Right, Left, fromNullable} = Either;
const Task = require('data.task');

// F a -> G a
// nt(F).map(f) === nt(F.map(f))

const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x)
});

// first :: [] -> Either
const first = xs => fromNullable(xs[0]);
const res3 = first([1,2,3]).map(x => x +1);
const res4 = first([1,2,3].map(x => x +1));
 console.log(res3);  // Either(2)
 console.log(res4); // Either(2)

const boxToEither = b => 
    b.fold(Left);

const res1 = boxToEither(Box(100)).map(x => x * 2);
console.log(res1);  
const res2 = boxToEither(Box(100).map(x => x * 2));
console.log(res2); 
const eitherToTask = e => 
    e.fold(Task.rejected, Task.of);

eitherToTask(Right('Good'))
    .fork(e => console.error('err', e), x => console.log('res', x));    