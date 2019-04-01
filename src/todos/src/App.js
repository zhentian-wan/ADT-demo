import React from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'

import TodoList from './components/TodoList'

import './App.css'

const App = () =>
 (<main className="app">
    <TodoList className="todoList"/>
  </main>)

App.propTypes = {
  data: PropTypes.shape({
    todos: PropTypes.array.isRequired
  })
}

export default hot(module)(App)
