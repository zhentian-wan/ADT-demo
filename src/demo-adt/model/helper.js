const {modify, get} = require('crocks/State');
const B = require('crocks/helpers/compose');

const assign = require('crocks/helpers/assign');
const objOf = require('crocks/helpers/objOf');
const prop = require('crocks/Maybe/prop');
const option = require('crocks/pointfree/option');

// getKey :: (str, a) -> () -> State s a
const getKey = (key, def) => () => get(B(option(def), prop(key)));

// putKey :: str -> a -> State s a
const putKey = key => B(modify, assign, objOf(key));
module.exports = {
    getKey,
    putKey
}