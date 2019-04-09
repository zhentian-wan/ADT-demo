import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {addTodo} from '../data/reducers/todo'
import Button from './controls/Button'

class AddTodo extends React.Component {

    static get defaultProps() {
        return {
            dispatch: Function.proptotype
        }
    }

    static get propTypes () {
        return {
            dispatch: PropTypes.func
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {input} = this;
        const title = input.value;
        if (title.length) {
            const {dispatch} = this.props;
            dispatch(addTodo({title}))
            input.value = '';
        }
    }

    render () {
        return (
            <form className="addTodo" onSubmit={this.onSubmit}>
            <input
                type="text"
                className="addTodo__input"
                ref={el => {this.input = el}} />
                <Button
                  className="addTodo__btn"
                  type="submit">Add Todo</Button>
            </form>
        )
    }
}

export default connect()(AddTodo)