const Task = require('data.task');
const Async = require('crocks/Async'); 
const {liftA3, liftN} = require('crocks'); 



const LazyBox = g => ({
    map: f => LazyBox(() => f(g())),
    fold: f => f(g())
})


const result = LazyBox(() => ' 64 ')
    .map(a => a.trim())
    .map(trimmed => new Number(trimmed))
    .map(number => number + 1)
    .map(x => String.fromCharCode(x))
    .fold(x => x.toLowerCase());

 console.log(result);   



 Task.of(1)
    .fork(e => console.error(e), a => console.log(a)) // 1
 
 // Foucs to reject:
 Task.rejected('not work')   
 .fork(e => console.error(e), a => console.log(a)) // not work

 Async.of('U Wut M8')
  .fork(e => console.error(e),a => console.log(a)) // U Wut M8

 Async.Rejected('Async badguy')
  .fork(e => console.error(e),a => console.log(a)) // Async badguy


 Task.of(1)
    .map(x => x + 1)
    .fork(e => console.error(e), a => console.log(a)) // 2


Task.rejected(1)
    .map(x => x + 1)
    .fork(e => console.error(e), a => console.log(a)) // 1 
    
Async.of(1)
    .map(x => x + 1)
    .fork(e => console.error(e),a => console.log(a)) //2
  
Async.Rejected(1)
    .map(x => x + 1)
    .fork(e => console.error(e),a => console.log(a)) // 1

Task.of(1)
    .map(x => x + 1)
    .chain(x => Task.of(x + 2))
    .fork(e => console.error(e), a => console.log(a)) // 4    

Async.of(1)
    .map(x => x + 1)
    .chain(x => Async.of(x + 2))
    .fork(e => console.error(e),a => console.log(a)) // 4  


const lunchMissiles = () =>
    new Task((rej, res) => {
        console.log('lunchMissiles');
        res('missile!')
    });    
  
const lunchRocky = () =>
    Async((rej, res) => {
        console.log('lunchRocky');
        res('Rocky!')
    });       

lunchMissiles()
    .map(x => x + "!")
    .fork(e => console.error(e), a => console.log(a)) // lunchMissiles missile!!


lunchRocky()
    .map(x => x + "!")
    .fork(e => console.error(e), a => console.log(a)) // lunchMissiles missile!!    

const taskApp =  lunchMissiles()
.map(x => x + "!");

const asyncApp = lunchRocky()
    .map(x => x + "!")

// apply :: (((*) -> b), [ a ]) -> b
const apply = fn => xs =>
  fn.apply(null, xs)
taskApp.map(x => "   From Task").fork(e => console.error(e), a => console.log(a))
asyncApp.map(x => "   From Async").fork(e => console.error(e), a => console.log(a))


const add = x => y => z=> x + y + z;
const addAsyncNumbers = liftA3(add);
Async.of(add)
    .ap(Async.of(5))
    .ap(Async((_, res) => {
        setTimeout(() => {
            console.log('resolve 2');
            res(2)
        }, 500)}))
    .ap(Async((_, res) => {
        setTimeout(() => {
            console.log('resolve 2');
            res(2)
        }, 500)}))
    .fork(e => console.error(e), x => console.log('async222', x));


const res = addAsyncNumbers(
    Async.of(5),
    Async((_, res) => {
        setTimeout(() => {
            console.log('resolve 2');
            res(2)
        }, 500)
}), Async((_, res) => {
    setTimeout(() => {
        console.log('resolve 3');
        res(3)
    }, 600)
}));
res.fork(e => console.error(e), x => console.log('async', x))

