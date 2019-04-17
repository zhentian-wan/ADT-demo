import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from './controls/Button'
import classnames from 'classnames'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import { compose, curry, option, propPath } from '../js/helper'

const FilterButton = ({ active, onClick }) => {
    const classes = classnames('filterButton', {
        'filterButton--active': active
    })
    return <Button className={classes} onClick={onClick} icon={faFilter} />
}

FilterButton.defaultProps = {
    active: true,
    onClick: Function.prototype
}

FilterButton.propTypes = {
    active: PropTypes.bool,
    group: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

const activeGroup = curry(group =>
    compose(
        option(false),
        propPath(['ui', 'filterGroups', group])
    )
)

const mapStateToProps = (state, ownProps) => ({
    active: activeGroup(ownProps.group, state)
})

export default connect(mapStateToProps)(FilterButton)
