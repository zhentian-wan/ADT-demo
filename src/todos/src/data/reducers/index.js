import execWith from 'crocks/State/execWith'
import { combineReducers } from '../helper'
import todo from './todo'
import filterTodos from './filterTodos'

const reducers = combineReducers([todo, filterTodos])
const reducer = (prevState, action) =>
    reducers(action)
        .map(execWith(prevState))
        .option(prevState)

export default reducer
