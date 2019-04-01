import React from 'react'
import { hot } from 'react-hot-loader'

import TodoList from './components/TodoList'

import './App.css'

const App = () =>
  <main className="app">
    <TodoList className="todoList"/>
  </main>

export default hot(module)(App)
