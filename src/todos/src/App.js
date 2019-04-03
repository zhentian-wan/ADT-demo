import React from 'react'
import { hot } from 'react-hot-loader'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

import './App.css'

const App = () =>
  <main className="app">
    <AddTodo />
    <TodoList className="todoList"/>
  </main>

export default hot(module)(App)
