import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {toggleTodo} from '../data/reducers/todo'
import Todo from './Todo'

const TodoList = ({todos, toggle}) =>
 (<ul className="todos">
      {todos.map((todo, index) =>
          <Todo
            onTodoClick={toggle}
            key={index}
            todo={todo} />
      )}
    </ul>)

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  toggle: PropTypes.func
}

const mapStateToProps = ({todos}) => ({todos})
const mapDispatchToProps = (dispatch) => ({
  toggle: id => dispatch(toggleTodo({id}))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
