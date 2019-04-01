import First from 'crocks/First'
import State from 'crocks/State'
import applyTo from 'crocks/combinators/applyTo'
import compose from 'crocks/helpers/compose'
import mconcatMap from 'crocks/helpers/mconcatMap'
import safe from 'crocks/Maybe/safe'
import isSameType from 'crocks/predicates/isSameType'

import todo from './todo'

const runReducer = action => compose(
    safe(isSameType(State)),
    applyTo(action)
)

const combineReducers = reducers => action =>
    mconcatMap(First, runReducer(action), reducers)
        .option(State.of(action))

const reducers = combineReducers([
    todo
])
const reducer = (prevState, action) =>
    reducers(action).execWith(prevState)

export default reducer;
