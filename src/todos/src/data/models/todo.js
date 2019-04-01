import State from 'crocks/State'

import assoc from 'crocks/helpers/assoc'
import compose from 'crocks/helpers/compose'
import map from 'crocks/pointfree/map'

import { propArray, updateRecord, negate } from '../helper'

const { get, modify } = State

const commit = compose(
  modify,
  assoc('todos')
)

const filpComplete = title => map(updateRecord(title, { completed: negate }))

const mapTodos = mapFn =>
  get(
    compose(
      mapFn,
      propArray('todos')
    )
  )

export const toggle = ({ title }) => mapTodos(filpComplete(title)).chain(commit)
