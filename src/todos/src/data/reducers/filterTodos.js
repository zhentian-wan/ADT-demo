import {createAction, createReducer} from '../helper'
import {setFilter} from '../models/filterTodos'

const SHOW_ALL = 'SHOW_ALL'
const SHOW_COMPLETED = 'SHOW_COMPLETED'
const SHOW_ACTIVE = 'SHOW_ACTIVE'
const SET_TODO_FILTER = 'SET_TODO_FILTER'

export const filters = {
    SHOW_ALL,
    SHOW_ACTIVE,
    SHOW_COMPLETED
}

export const updateFilter =
    createAction(SET_TODO_FILTER)

const reducer = createReducer({
    [SET_TODO_FILTER]: setFilter
 })

 export default reducer