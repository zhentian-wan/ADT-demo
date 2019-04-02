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
/*
// Difference between redux's reducer and our reducer
// is that redux's reducer take (state, action)
// here we just take (action)
// we handle prevState by using State ADT
function todo({ type, payload }) {
  switch (type) {
    case TOGGLE_TODO:
      return toggle(payload)
  }
}*/

export default reducer
