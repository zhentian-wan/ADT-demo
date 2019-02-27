const Task = require('data.task');
const Async = require('crocks/Async');
const fs = require('fs');

const app = () => {
    fs.readFile('config.json', 'utf-8', (err, content) => {
        if (err) throw err;

        const newContents = content.replace(/8/g, '6');

        fs.writeFile('config1.json', newContents, (err, _) => {
            if (err) throw err;
            console.log('success!');
        })
    });
}

//app();

/////////////new//////////

const readFile = (filename) =>
    new Task((rej, res) =>
        fs.readFile(filename, 'utf-8', (err, content) => {
            err ? rej(err) : res(content);
        }));
const writeFile = (filename, content) =>
    new Task((rej, res) =>
        fs.writeFile(filename, content, (err, success) => {
            err ? rej(err) : res(success);
        }));

const TaskApp = readFile('config.json')
        .map(content => content.replace(/8/g, '6'))
        .chain(newContent => writeFile('config1.json', newContent));
/*
TaskApp.fork(e => console.error(e),
          x => console.log('success!'));*/

/////////////Async////////////

const readF = (filename) =>
  Async((rej, res) =>
    fs.readFile(filename, 'utf-8', (err, content) => {
        err ? rej(err): res(content);
    }));

const writeF = (filename, content) =>
    Async((rej, res) =>
        fs.writeFile(filename, content, (err, success) => {
            err ? rej(err) : res(success)
        }));

const AsyncApp = readF('config.json')
        .map(content => content.replace(/8/g, '6'))
        .chain(newContent => writeF('config2.json', newContent));
AsyncApp.fork(
    e => console.error(e),
    x => console.log('success!!')
);