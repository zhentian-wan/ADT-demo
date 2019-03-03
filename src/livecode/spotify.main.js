/**
 * https://api.spotify.com/v1/search?q={query}&type=artist
 * https://api.spotify.com/v1/artists/${id}/related-artists
 */

 const Task = require('data.task');
 const Spotify = require('./spotify');
 const {findArtist, relatedArtists} = Spotify;
 // argv :: Task [a]
 const argv = new Task((rej, res) => res(process.argv));
 // names :: [a] -> [b]
 const names = argv.map(args => args.slice(2));

const related = name =>
    findArtist(name)
    .map(artist => artist.id)
    .chain(id => relatedArtists(id))
    .map(artist => artist.name);

 const main = ([name1, name2]) =>
    Task.of(rels1 => rels2 => [rels1, rels2])
        .ap(related(name1))
        .ap(related(name2));

 names.chain(main)
    .fork(console.error, console.log);

