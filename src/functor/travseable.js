const fs = require("fs");
const Task = require("data.task");
const futurize = require("futurize").futurize(Task);
const { List, Map } = require("immutable-ext");
/*
const readFile = (filename, encode) => new Task((rej, res) => {
    return fs.readFile(filename, encode, (err, content) => {
        if (err) rej(err);
        res(content);
    });
});*/
const readFile = futurize(fs.readFile);

const files = List(["config1.json", "config2.json"]);

files.traverse(Task.of, f => readFile(f, "utf-8"));
/*.fork(console.error, x => {
        console.log(x.toJS());
        return x.toJS();
    })*/

const httpGet = path => Task.of(`${path}: result`);
/*
const res = Map({home: '/', about: '/about-us', blog: '/blog'})
    .map(route => httpGet(route));
console.log(res); // Map { "home": Task, "about": Task, "blog": Task }*/

/*
const res = Map({home: '/', about: '/about-us', blog: '/blog'})
    .traverse(Task.of, route => httpGet(route))
    .fork(console.error, console.log);
console.log(res); //Task { fork: [Function], cleanup: [Function: cleanupBoth] }*/

Map({ home: ["/", "/home"], about: ["/about-us"] })
  .traverse(Task.of, routes =>
    List(routes).traverse(Task.of, route => httpGet(route))
  )
  .fork(console.error, x => console.log(x.toJS())); //{ home: [ '/: result', '/home: result' ], about: [ '/about-us: result' ] }

async function getInfos() {
  const [home, about] = { home: ["/", "/home"], about: ["/about-us"] };
  const res = await Promise.all([home, about].map(route => httpGet(route)));
}
