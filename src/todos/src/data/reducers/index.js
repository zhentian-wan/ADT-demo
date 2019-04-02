import execWith from 'crocks/State/execWith'
import { combineReducers } from '../helper'
import todo from './todo'

const reducers = combineReducers([todo])
const reducer = (prevState, action) =>
    reducers(action)
        .map(execWith(prevState))
        .option(prevState)

export default reducer
