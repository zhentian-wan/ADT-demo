import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FilterLink from './FilterLink'

import Pair from 'crocks/Pair'
import map from 'crocks/pointfree/map'
import merge from 'crocks/pointfree/merge'

import {filters} from '../data/reducers/filterTodos'

const {SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED} = filters;

const filterList = [
    Pair(SHOW_ALL, 'All'),
    Pair(SHOW_COMPLETED, 'Completed'),
    Pair(SHOW_ACTIVE, 'Active')
]

// buildFilter :: (String, String) -> JSX
const buildFilter = (filter, text) =>
    <FilterLink key={filter} filter={filter}>{text}</FilterLink>

const buildFitlers =
    map(merge(buildFilter))

const Filters = () => (
    <div className="filters">
        {buildFitlers(filterList)}
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