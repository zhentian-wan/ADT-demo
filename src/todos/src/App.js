import React from 'react'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'

const App = ({data}) =>
 (<main>
    <ul className="todos">
      {data.todos.map((todo, index) =>
          <li className="todo" key={index}>
            {todo.title}
          </li>
        )}
    </ul>
  </main>)

App.propTypes = {
  data: PropTypes.shape({
    todos: PropTypes.array.isRequired
  })
}

export default hot(module)(App)
