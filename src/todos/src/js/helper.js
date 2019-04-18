// ramda imports
import lensPath from 'ramda/src/lensPath'
import lensProp from 'ramda/src/lensProp'
import over from 'ramda/src/over'
import not from 'ramda/src/not'

// Crocks imports
import Pair from 'crocks/Pair'
import Pred from 'crocks/Pred'
import State from 'crocks/State'
import applyTo from 'crocks/combinators/applyTo'
import chain from 'crocks/pointfree/chain'
import compose from 'crocks/helpers/compose'
import curry from 'crocks/helpers/curry'
import defaultTo from 'crocks/helpers/defaultTo'
import fst from 'crocks/Pair/fst'
import map from 'crocks/pointfree/map'
import merge from 'crocks/pointfree/merge'
import isBoolean from 'crocks/predicates/isBoolean'
import isFunction from 'crocks/predicates/isFunction'
import isSameType from 'crocks/predicates/isSameType'
import isObject from 'crocks/predicates/isObject'
import option from 'crocks/pointfree/option'
import propPath from 'crocks/Maybe/propPath'
import safe from 'crocks/Maybe/safe'
import safeAfter from 'crocks/Maybe/safeAfter'
import snd from 'crocks/Pair/snd'

// ramda exports
export { lensPath, lensProp, over, not }

// Crocks exports
export {
    Pair,
    Pred,
    State,
    chain,
    compose,
    curry,
    defaultTo,
    fst,
    map,
    merge,
    isBoolean,
    isSameType,
    option,
    propPath,
    safe,
    snd
}

// safeDispatch :: (Func, a, b) -> (), Side effect function.
export const safeDispatch = (dispatch, actionFn, value) => {
    safe(isFunction, actionFn)
        .chain(safeAfter(isObject, applyTo(value))) // run applyTo(value), then check result with safeAfter(isObject)
        .map(dispatch)
}
