import { applyTo, isFunction, isObject, safe, safeAfter } from './lib'

// safeDispatch :: (Func, a, b) -> (), Side effect function.
export const safeDispatch = (dispatch, actionFn, value) => {
    safe(isFunction, actionFn)
        .chain(safeAfter(isObject, applyTo(value))) // run applyTo(value), then check result with safeAfter(isObject)
        .map(dispatch)
}
