import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FilterLink from './FilterLink'

import {filters} from '../data/reducers/filterTodos'

const {SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED} = filters;

const Filters = ({todoFilter}) => (
    <div className="filters">
        <FilterLink filter={SHOW_ALL} active={todoFilter === SHOW_ALL}>All</FilterLink>
        <FilterLink filter={SHOW_COMPLETED}>Completed</FilterLink>
        <FilterLink filter={SHOW_ACTIVE}>Active</FilterLink>
    </div>
)

Filters.propTypes = {
    todoFilter: PropTypes.string.isRequired
}

const mapStateToProps = ({todoFilter}) => ({
    todoFilter
})

export default connect(
    mapStateToProps
)(Filters)