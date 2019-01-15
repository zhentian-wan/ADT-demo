const state = {
    cards: [
        {id: 'green-square', color: 'green', shape: 'square'},
        {id: 'orange-square', color: 'orange', shape: 'square'},
        {id: 'blue-square', color: 'blue', shape: 'triangle'}
    ],
    left: 8,
    moves: 0
}

const {State, when, assign, map, mapProps, propEq, curry, compose} = require('crocks');
const {modify, get} = State;

const inc = x => x + 1;
const dec = x => x - 1;

const clamp = (min, max) => x => Math.min(Math.max(min, x), max);
const clampAfter = curry((min, max, fn) =>
  compose(
    clamp(min, max),
    fn
  )
);

const limitMoves = clampAfter(0, 8);

const decLeft = () => over("left", limitMoves(dec));
const incMoves = () => over("moves", limitMoves(inc));



const markSelected = id => assignBy(propEq('id', id), {selected: true})
const assignBy = (pred, obj) => when(pred, assign(obj));
const over = (key, fn) => modify(mapProps({ [key]: fn }));

const selectCard = id => over('cards', map(markSelected(id)))

const answer = (id) => State.of(id)
    .chain(incMoves)
    .chain(incMoves)
    .chain(decLeft)
    .chain(selectCard);


console.log(
    JSON.stringify(
        answer('green-square').execWith(state),
        null,
        2
    )
);


/*
// Using Ramda to implememnt the same logic
const {compose, map, propOr, when, propEq, mergeLeft} = require('ramda');

const markAsSelected = (id) => when(propEq('id', id), mergeLeft({selected: true}))
const over = (key, fn) => compose(map(fn), propOr([], key));

const selectCard2 = (id) => over('cards', markAsSelected(id))

console.log(
    JSON.stringify(
        selectCard2('green-square')(state),
        null,
        2
    )
)*/