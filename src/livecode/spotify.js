const request = require('request');
const Task = require('data.task');
const Either = require('data.either');

const first = xs =>
    Either.fromNullable(xs[0]);

const eitherToTask = e =>
    e.fold(Task.rejected, Task.of);

const httpGet = url =>
    new Task((rej, res) =>
    request(url, (err, response, body) =>
        err ? rej(err) : res(body)));

const parse = Either.try(JSON.parse);

const getJSON = url =>
    httpGet(url)
        .map(parse)
        .chain(eitherToTask);

const findArtist = name =>
    getJSON(`https://api.spotify.com/v1/search?1=${name}&type=artist`)
    .map(console.log)
    .map((result) => result.artists.items) // Task
    .map(first) // Task(Either)
    .chain(eitherToTask) // Task

const relatedArtists = id =>
    getJSON(`https://api.spotify.com/v1/artists/${id}/related-artists`)
    .map(result => result.artists);


module.exports = {
    findArtist, relatedArtists
}