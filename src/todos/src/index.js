import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import App from './App'
import DefaultErrorBoundary from './DefaultErrorBoundary'
import './styles.css'

if (process.env.NODE_ENV === 'development') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

const data = {
  todos: [
    {title: 'Hug Unicorn'},
    {title: 'Mess with Texas'},
    {title: 'Do Laundry'}
  ]
}

ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundary>
      <App data={data}/>
    </DefaultErrorBoundary>
  </React.StrictMode>,
  document.getElementById('app')
)
