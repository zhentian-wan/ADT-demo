import State from 'crocks/State'
import map from 'crocks/pointfree/map'
import compose from 'crocks/helpers/compose'
import assoc from 'crocks/helpers/assoc'
import {propArray, updateRecord, negate} from '../helper'

const {get, modify} = State

export const TOGGLE_TODO = 'TOGGLE_TODO';
export const toggleTodo = payload =>
    ({type: TOGGLE_TODO, payload})

const filpComplete = title =>
    map(updateRecord(title, {completed: negate}))

const commit = compose(
    modify,
    assoc('todos')
)

const toggle = ({title}) =>
    get(propArray('todos'))
    .map(x => console.log(x) || x)
     .map(filpComplete(title))
     .map(x => console.log(x) || x)
     .chain(commit)

function todo ({type, payload}) {
    switch(type) {
        case TOGGLE_TODO:
            return toggle(payload)
    }
}

export default todo