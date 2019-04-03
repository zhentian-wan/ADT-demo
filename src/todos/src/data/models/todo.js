import State from 'crocks/State'

import assoc from 'crocks/helpers/assoc'
import concat from 'crocks/pointfree/concat'
import compose from 'crocks/helpers/compose'
import defaultProps from 'crocks/helpers/defaultProps'
import map from 'crocks/pointfree/map'

import { propArray, updateRecord, negate } from '../helper'
const { get, modify } = State

// Todo :: {title: String, completed: Boolean}
// Todos :: [Todo]

// commit :: [Todo] -> State AppState ()
const commit = compose(
  modify,
  assoc('todos')
)

// defaultTodo :: Object -> Todo
const defaultTodo = defaultProps({
  title: '',
  completed: false
})

const filpComplete = title => map(updateRecord(title, { completed: negate }))

// mapTodos :: (Todos -> a) -> State AppState a
const mapTodos = mapFn =>
  get(
    compose(
      mapFn,
      propArray('todos')
    )
  )

// toggle :: Object -> State AppState ()
export const toggle = ({ title }) =>
    mapTodos(filpComplete(title))
    .chain(commit)

// add :: Object -> State AppState ()
export const add = (newTodo) =>
    mapTodos(concat([defaultTodo(newTodo)]))
    .chain(commit)