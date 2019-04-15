import Pair from 'crocks/Pair'
import Pred from 'crocks/Pred'
import applyTo from 'crocks/combinators/applyTo';
import curry from 'crocks/helpers/curry'
import defaultTo from 'crocks/helpers/defaultTo'
import fst from 'crocks/Pair/fst';
import map from 'crocks/pointfree/map'
import merge from 'crocks/pointfree/merge'
import isFunction from 'crocks/predicates/isFunction';
import isSameType from 'crocks/predicates/isSameType';
import isObject from 'crocks/predicates/isObject';
import safe from 'crocks/Maybe/safe';
import safeAfter from 'crocks/Maybe/safeAfter';
import snd from 'crocks/Pair/snd';

export {
    Pair, Pred, curry, defaultTo, fst, map, merge, isSameType, snd
}

// safeDispatch :: (Func, a, b) -> (), Side effect function.
export const safeDispatch = (dispatch, actionFn,  value) => {
    safe(isFunction, actionFn)
        .chain(safeAfter(isObject, applyTo(value))) // run applyTo(value), then check result with safeAfter(isObject)
        .map(dispatch)
}
