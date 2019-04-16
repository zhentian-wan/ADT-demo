import React from 'react'
import PropTypes from 'prop-types'
import Button from './controls/Button'
import classnames from 'classnames'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

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

export default FilterButton
