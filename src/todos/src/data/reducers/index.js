import execWith from 'crocks/State/execWith'
import { combineReducers } from '../helper'
import filterTodos from './filterTodos'
import todo from './todo'
import ui from './ui'

const reducers = combineReducers([filterTodos, todo, ui])
const reducer = (prevState, action) =>
    reducers(action)
        .map(execWith(prevState))
        .option(prevState)

export default reducer
