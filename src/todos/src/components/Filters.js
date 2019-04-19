import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FilterSection from './controls/FilterSection'
import { filters, updateFilter } from '../data/reducers/filterTodos'
import { Pair } from '../js/helper'
const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = filters

// statusFilters :: Pair String String
const statusFilters = [
    Pair(SHOW_ALL, 'All'),
    Pair(SHOW_COMPLETED, 'Completed'),
    Pair(SHOW_ACTIVE, 'Active')
]

const Filters = ({ showStatus }) => (
    <div className="filters">
        {showStatus && (
            <FilterSection
                applyFilter={updateFilter}
                filterState="todoFilter"
                filters={statusFilters}
            />
        )}
    </div>
)

Filters.propTypes = {
    showStatus: PropTypes.bool
}

const mapStateToProps = ({ ui }) => ({
    showStatus: ui.filterGroups.status
})

export default connect(mapStateToProps)(Filters)
