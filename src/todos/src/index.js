import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import { Provider } from 'react-redux'
import App from './App'
import DefaultErrorBoundary from './DefaultErrorBoundary'
import store from './data/store'
import './styles.css'

if (process.env.NODE_ENV === 'development') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

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
