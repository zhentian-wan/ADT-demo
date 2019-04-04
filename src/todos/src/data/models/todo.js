import State from 'crocks/State'

import assoc from 'crocks/helpers/assoc'
import concat from 'crocks/pointfree/concat'
import compose from 'crocks/helpers/compose'
import composeK from 'crocks/helpers/composeK'
import defaultProps from 'crocks/helpers/defaultProps'
import liftA2 from 'crocks/helpers/liftA2'
import map from 'crocks/pointfree/map'

import { propArray, updateRecord, negate } from '../helper'
import { genId } from './nextId';
const { get, modify } = State

// Todo :: {id: Number, title: String, completed: Boolean}
// Todos :: [Todo]

// create :: Object -> State AppState Todo
const create = rec => liftA2(
  assoc('id'),
  genId(),
  applyDefaults(rec)
)

// commit :: [Todo] -> State AppState ()
const commit = todos =>
  modify(assoc('todos', todos))

// defaultTodo :: Object -> Todo
const defaultTodo = defaultProps({
  title: '',
  completed: false
})

// applyDefaults :: Object -> State AppState rec
const applyDefaults = rec =>
  State.of(rec)
    .map(defaultTodo)

const filpComplete = title => map(updateRecord(title, { completed: negate }))

// mapTodos :: (Todos -> a) -> State AppState a
const mapTodos = mapFn =>
  get(
    compose(
      mapFn,
      propArray('todos')
    )
  )

const addTodo = newTodo =>
  mapTodos(concat([newTodo]))

// toggle :: Object -> State AppState ()
export const toggle = ({ title }) =>
    mapTodos(filpComplete(title))
    .chain(commit)

// add :: Object -> State AppState ()
export const add =
    composeK(
      commit,
      addTodo,
      create
    )
    /*mapTodos(concat([defaultTodo(newTodo)]))
    .chain(commit)*/