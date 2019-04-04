import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './Todo.css'

function Todo ({todo, onTodoClick}) {

    const {title, completed} = todo;
    const classes = classnames('todo', {
        'todo--completed': completed
    })

    return (
        <li className={classes} onClick={() => onTodoClick(title)}>
            {title}
        </li>
    )
}

Todo.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        completed: PropTypes.bool
    }),
    onTodoClick: PropTypes.func
}

export default Todo
