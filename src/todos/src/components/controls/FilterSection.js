import React from 'react'
import PropTypes from 'prop-types'
import FilterLink from '../FilterLink'
import curry from 'crocks/helpers/curry'
import map from 'crocks/pointfree/map'
import merge from 'crocks/pointfree/merge'


// buildFilter :: fn -> (String, String) -> JSX
const buildFilter = curry((fn, filter, text) =>
    <FilterLink key={filter} filter={filter}>{text}</FilterLink>)

// buildFilters :: fn -> [(Pair String String)] -> JSX
const buildFitlers = curry(fn => map(merge(buildFilter(fn))))

class FilterSection extends React.Component {

    render( ) {
        const {filters, applyFilter} = this.props;
        return (<div className="filterSection">
            {buildFitlers(applyFilter, filters)}
        </div>)
    }
}

FilterSection.defaultProps = {
    applyFilter: Function.prototype,
    filters: []
}

FilterSection.propTypes = {
    applyFilter: PropTypes.func,
    filters: PropTypes.array
}

export default FilterSection