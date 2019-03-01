const Either = require('data.either');
const Task = require('data.task');
const {List, Map} = require('immutable-ext');
const {Right, Left, fromNullable} = Either;

const log = console.log;

// F a -> G a
// nt(F).map(f) === nt(F.map(f))

//////Exp1/////
const res = List(['Hello', 'wolrd']).chain(x => x.split(''));
console.log(res.toJS()); // [ 'H', 'e', 'l', 'l', 'o', 'w', 'o', 'l', 'r', 'd' ]

//////Exp2/////
const first = xs => fromNullable(xs[0]);
const largeNumbers = xs => xs.filter(x => x > 100);
const doulbe = x => x * 2;

// We first run though the whole array to doulbe the number
// Then apply first to either transform -> Proformance cost
// Since nt(F).map(f) === nt(F.map(f))
const transform1 = xs => first(largeNumbers(xs).map(doulbe));
// Now we get first of array and transform to either, then apply our doulbe function
const transform2 = xs => first(largeNumbers(xs)).map(doulbe);
const app = xs => transform2(xs);
console.log(app([2,400,5,100])); // Either { value: 800 }

//////Exp3/////
const Box  = x => ({
    map: f => Box(f(x)),
    fold: f => f(x)
});
const fake = id =>
    ({id, name: 'user1', best_friend_id: id + 1});
// Db :: find :: id -> Task(Either)
const Db = ({
    find: id => new Task((rej, res) => {
        res(id > 2 ? Right(fake(id)): Left('not found'))
    })
});

const eitherToTask = e =>
    e.fold(Task.rejected, Task.of);

Db.find(4) // Task(Right(User))
    .chain(eitherToTask) // Task(Right(User)) --EtT--> Task(Task(User)) --chain--> Task(User)
    .chain(user => Db.find(user.best_friend_id)) // Task(User) --Db.find--> Task(Task(Right(User))) --chain--> Task(Right(User))
    .chain(eitherToTask) // Task(Right(User)) --EtT--> Task(Task(User)) --chain--> Task(User)
    .fork(console.error, console.log); // { id: 5, name: 'user1', best_friend_id: 6 }