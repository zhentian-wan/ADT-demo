import { toggle } from '../models/todo'
import {createAction, createReducer} from '../helper'

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const addTodo = createAction(ADD_TODO)
export const toggleTodo = createAction(TOGGLE_TODO)

const reducer = createReducer({
  [TOGGLE_TODO]: toggle,
  [ADD_TODO]: () => {}
})

export default reducer
