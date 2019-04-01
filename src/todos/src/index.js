import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import App from './App'
import DefaultErrorBoundary from './DefaultErrorBoundary'
import './styles.css'

import {Provider} from 'react-redux'
import {createStore} from 'redux';
import reducer from './data/reducers'

if (process.env.NODE_ENV === 'development') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

const data = {
  todos: [
    {title: 'Hug Unicorn', completed: false},
    {title: 'Mess with Texas', completed: false},
    {title: 'Do Laundry', completed: true}
  ]
}

const store = createStore(reducer, data);

ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </DefaultErrorBoundary>
  </React.StrictMode>,
  document.getElementById('app')
)
