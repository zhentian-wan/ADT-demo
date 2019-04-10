import { createStore, compose } from 'redux'
import reducer from './reducers'

import identity from 'crocks/combinators/identity'

const data = {
    nextId: 4,
    todoFilter: 'SHOW_ALL',
    todos: [
      { id: 1, title: 'Hug Unicorn', completed: false },
      { id: 2, title: 'Mess with Texas', completed: false },
      { id: 3, title: 'Do Laundry', completed: true }
    ]
  }

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, data, composeEnhancers(identity))

export default store;