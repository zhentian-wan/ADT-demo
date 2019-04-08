import First from 'crocks/First'
import Pred from 'crocks/Pred'
import State from 'crocks/State'

import applyTo from 'crocks/combinators/applyTo'
import chain from 'crocks/pointfree/chain'
import compose from 'crocks/helpers/compose'
import equals from 'crocks/pointfree/equals'
// import flip from 'crocks/combinators/flip'
import safe from 'crocks/Maybe/safe'
import isArray from 'crocks/predicates/isArray'
import isFunction from 'crocks/predicates/isFunction'
import isSameType from 'crocks/predicates/isSameType'
import mconcatMap from 'crocks/helpers/mconcatMap'
import merge from 'crocks/pointfree/merge'
import mreduceMap from 'crocks/helpers/mreduceMap'
import option from 'crocks/pointfree/option'
import or from 'crocks/logic/or'
import prop from 'crocks/Maybe/prop'
import propOr from 'crocks/helpers/propOr'
import toPairs from 'crocks/Pair/toPairs'
import when from 'crocks/logic/when'
import unless from 'crocks/logic/unless'

// Reducer :: Action -> Maybe (State AppState ())
// Action :: {type: String, payload: a}

// combineReducers :: [Reducer] -> Action -> Reducer
export const combineReducers = reducers => action =>
  mreduceMap(First, applyTo(action), reducers)
/*
export const combineReducers = flip(action =>
  mreduceMap(First, applyTo(action)))

export const combineReducers =
  flip(compose(mreduceMap(First), applyTo))*/

// negate :: a -> Boolean
export const negate = x => !x

// propArray :: String -> Object -> Array
export const propArray = key =>
  compose(
    option([]),
    chain(safe(isArray)),
    prop(key)
  )

// updateRecord :: (Object, (Object -> Object)) -> Object
export const updateRecord = (query, update) =>
  when(where(query), update)

// createAction :: String -> a -> Action a
export const createAction = type => payload =>
  ({type, payload})

// createReducer :: Object -> Action -> Reducer
export const createReducer = strats => ({type, payload}) =>
  prop(type, strats)
    .map(applyTo(payload)) // Maybe (State AppState ())
    .chain(safe(isSameType(State)));

// predOrEq :: a -> (b -> Boolean)
const predOrEq = unless(
  or(isFunction, isSameType(Pred)), // When it is not a function or not a Pred monoid
  equals // then just check whether values are equal.
)

// propSatisfies :: (String, a -> boolean) -> Object -> Boolean
const propSatisfies = (key, pred) => compose(
  option(false),
  chain(safe(predOrEq(pred))),
  prop(key)
)

// where :: Object -> Object -> Boolean
// toPairs will turns {id: xxx, name: xxx} into
// Pair(id, xxx), Pair(name, xxx)
// Then inside merge will pass 'id' as key and 'xxx' as pred to propSatisfies
export const where = compose(
  mconcatMap(Pred, merge(propSatisfies)),
  toPairs
)