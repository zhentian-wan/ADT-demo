import React from 'react'
import { hot } from 'react-hot-loader'

import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

import './App.css'
import Filters from './components/Filters'

const App = () => (
    <main className="app">
        <AddTodo />
        <TodoList className="todoList" />
        <Filters />
    </main>
)

export default hot(module)(App)
