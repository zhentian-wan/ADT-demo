import First from 'crocks/First'
import State from 'crocks/State'

import applyTo from 'crocks/combinators/applyTo'
import chain from 'crocks/pointfree/chain'
import compose from 'crocks/helpers/compose'
import equals from 'crocks/pointfree/equals'
import safe from 'crocks/Maybe/safe'
import isArray from 'crocks/predicates/isArray'
import isSameType from 'crocks/predicates/isSameType'
import mapProps from 'crocks/helpers/mapProps'
import mreduceMap from 'crocks/helpers/mreduceMap'
import option from 'crocks/pointfree/option'
import prop from 'crocks/Maybe/prop'
import propOr from 'crocks/helpers/propOr'
import when from 'crocks/logic/when'

// Reducer :: Action -> Maybe (State AppState ())
// Action :: {type: String, payload: a}

// combineReducers :: [Reducer] -> Action -> Reducer
export const combineReducers = reducers => action =>
  mreduceMap(First, applyTo(action), reducers)

// negate :: a -> Boolean
export const negate = x => !x

// propArray :: String -> Object -> Array
export const propArray = key =>
  compose(
    option([]),
    chain(safe(isArray)),
    prop(key)
  )

const runReducer = action =>
  compose(applyTo(action))

// sameTitle :: String -> Object -> Boolean
const sameTitle = title =>
  compose(
    equals(title),
    propOr('', 'title')
  )

// updateRecord :: (String, Object) -> Object
export const updateRecord = (title, update) =>
  when(sameTitle(title), mapProps(update))

// createAction :: String -> a -> Action a
export const createAction = type => payload =>
    ({type, payload})

// createReducer :: Object -> Action -> Reducer
export const createReducer = strats => ({type, payload}) =>
  prop(type, strats)
    .map(applyTo(payload)) // Maybe (State AppState ())
    .chain(safe(isSameType(State)));