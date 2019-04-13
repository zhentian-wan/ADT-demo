import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Pair from 'crocks/Pair'
import FilterSection from './controls/FilterSection'
import {filters, updateFilter} from '../data/reducers/filterTodos'

const {SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED} = filters;

// statusFilters :: Pair String String
const statusFilters = [
    Pair(SHOW_ALL, 'All'),
    Pair(SHOW_COMPLETED, 'Completed'),
    Pair(SHOW_ACTIVE, 'Active')
]

const Filters = () => (
    <div className="filters">
        <FilterSection
            applyFilter={updateFilter}
            filters={statusFilters}/>
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