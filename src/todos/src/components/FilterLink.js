import React from 'react'
import {connect} from 'react-redux'
import Link from './controls/Link'
import applyTo from 'crocks/combinators/applyTo';
import isFunction from 'crocks/predicates/isFunction';
import isObject from 'crocks/predicates/isObject';
import safe from 'crocks/Maybe/safe';
import safeAfter from 'crocks/Maybe/safeAfter';

const mapProps = (state, own) => ({
    active: state.todoFilter === own.filter
})

// safeDispatch :: (Func, a, b) -> (), Side effect function.
const safeDispatch = (dispatch, actionFn,  value) => {
    safe(isFunction, actionFn)
        .chain(safeAfter(isObject, applyTo(value))) // run applyTo(value), then check result with safeAfter(isObject)
        .map(dispatch)
        //.map(constant(value)) // if you wish to return value instead of undefined
}

const mapDispatch = (dispatch, own) => ({
    onClick: () => {
        const {applyFilter, filter} = own;
        safeDispatch(dispatch, applyFilter, filter)
    }
})

/*
const mapDispatch = (dispatch, own) => ({
    onClick: () => {
        const {applyFilter, filter} = own;
        if (isFunction(applyFilter)) {
            const action = applyFilter(filter);
            if (isObject(action)) {
                dispatch(applyFilter(filter))
            }
        }
    }
})*/

export default connect(mapProps, mapDispatch)(Link)