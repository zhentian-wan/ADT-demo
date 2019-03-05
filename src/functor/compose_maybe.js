const crocks = require('crocks');
const {and, isString, Maybe, prop, safe, option, map, alt, chain} = crocks;
const {not, isEmpty, compose, converge, join, split, toLower} = require('ramda');

///////////////UTILS/////////////////
const joinKey = compose(join('_'),  split(' '), toLower);
const isNotEmpty = compose(
    not,
    isEmpty
)
const isNonEmptyString = and(isNotEmpty, isString);
/*const isNonEmptyString = R.converge(
    R.and,
    [
        isNotEmpty,
        isString
    ]
);*/

const createUrl = key =>`https://egghead.io/articles/${joinKey(key)}`;

////////////////MAIN////////////////

const article = {
     id: 1,
     name: 'Learn FP with this one weird trick'
};

/*
const getUrl = obj =>
    prop('name', obj) // Maybe(string)
        .chain(safe(isNonEmptyString)) // Maybe(string) --safe(isNonEmptyString)--> Maybe(Maybe(String)) --chain--> Maybe(String)
        .alt(Maybe.of('Nope')) // Nothing -> Just('Nope')
        .map(createUrl)
        .option('default');
  */
 
const getSafeName = compose(
    chain(safe(isNonEmptyString)),
    prop('name')
);
const getUrlOrDefault = compose(
    option('Not valid URL'),
    map(createUrl)
);
const getUrl = compose(
    getUrlOrDefault,
    getSafeName
);
const getUrlOrNope = compose(
    getUrlOrDefault,
    alt(Maybe.of('Nope')),
    getSafeName
) 
const res = getUrl(article);
console.log(res);   