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


//////Epx4//////////
// getValue :: Selector -> Task Error (Maybe String)
// postComment :: String -> Task Error Comment
// validate :: String -> Either ValidationError String

// saveComment :: () -> Task Error (Maybe (Either ValidationError (Task Error Comment)))
const saveComment = compose(
    map(map(map(postComment))), // Task(Maybe(Task)) --postComment--> Task(Maybe(Task(Task)))
    map(map(validate)),    // Task(Maybe) --validate--> Task(Maybe(Task))
    getValue('#comment'),  // Task(Maybe)
);
/*
// idToMaybe :: Identity a -> Maybe a
const idToMaybe = x => Maybe.of(x.$value);
// idToIO :: Identity a -> IO a
const idToIO = x => IO.of(x.$value);
// eitherToTask :: Either a b -> Task a b
const eitherToTask = either => either(Task.rejected, Task.of);
// ioToTask :: IO a -> Task () a
const ioToTask = x => new Task((reject, resolve) => resolve(x.unsafePerform()));
// maybeToTask :: Maybe a -> Task () a
const maybeToTask = x => (x.isNothing ? Task.rejected() : Task.of(x.$value));
// arrayToMaybe :: [a] -> Maybe a
const arrayToMaybe = x => Maybe.of(x[0]);
*/
// ISOMORPHIC JAVACRIPT
// promiseToTask :: Promise a b -> Task a b
const promiseToTask = x => new Task((rej, res) => x.then(res).catch(rej));
// taskToPromise :: Task a b -> Promise a b
const taskToPromise = x => new Promise((resolve, rejct) => x.fork(reject, resolve))

// Good
const x = Promise.resolve('ring');
console.log(taskToPromise(promiseToTask(x)) === x);

const y = Task.of('rabbit');
console.log(PromiseToTask(taskToPromise(y)) === y);

// Bad
// maybeToArray :: Maybe a -> [a]
const maybeToArray = x => (x.isNothing ? [] : [x.$value]);
// arrayToMaybe :: [a] -> Maybe a
const arrayToMaybe = x => Maybe.of(x[0]);
const x = ['elvis costello', 'the attractions'];
// not isomorphic
maybeToArray(arrayToMaybe(x)); // ['elvis costello']
// but is a natural transformation
compose(arryToMaybe, map(replace('elvis', 'lou')))(x); //  Just('lou costello')
compose(map(replace('elvis', 'lou'), arrayToMaybe))(x); // Just('lou costello')

// SOLUTION:
// getValue :: Selector -> Task Error (Maybe String)
// postComment :: String -> Task Error Comment
// validate :: String -> Either ValidationError String

// saveComment :: () -> Task Error (Maybe (Either ValidationError (Task Error Comment)))
const saveComment = compose(
    chain(postComment), // Task --postCommnet--> Task(Task) --chain--> Task(Comment)
    chain(eitherToTask),   // Task(Maybe) --EtT--> Task(Task) --chain--> Task
    map(validate),    // Task --validate--> Task(Maybe)
    chain(eitherToTask),   // Task(Maybe) --EtT--> Task(Task) --chain--> Task
    getValue('#comment'),  // Task(Maybe)
);

saveComment.fork(console.error, console.log) // Comment