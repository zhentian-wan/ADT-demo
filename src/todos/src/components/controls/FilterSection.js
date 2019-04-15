import React from 'react'
import PropTypes from 'prop-types'
import FilterLink from '../FilterLink'

import {curry, map, merge} from '../../js/helper'
import { stringPair } from '../../js/propTypes';

// buildFilter :: fn -> (String, String) -> JSX
const buildFilter = curry((fn, filterState, filter, text) =>
    <FilterLink key={filter}
        applyFilter={fn}
        filter={filter}
        filterState={filterState}
    >
        {text}
    </FilterLink>)

// buildFilters :: fn -> [(Pair String String)] -> JSX
const buildFitlers = curry((fn, filterState) => map(merge(buildFilter(fn, filterState))))

class FilterSection extends React.Component {

    render( ) {
        const {filters, applyFilter, filterState} = this.props;
        return (<div className="filterSection">
            {buildFitlers(applyFilter, filterState, filters)}
        </div>)
    }
}

FilterSection.defaultProps = {
    applyFilter: Function.prototype,
    filters: [],
    filterState: ''
}

FilterSection.propTypes = {
    applyFilter: PropTypes.func,
    filters: PropTypes.arrayOf(stringPair),
    filterState: PropTypes.string
}

export default FilterSection