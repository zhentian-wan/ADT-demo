import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button';

const Link = ({active, children, onClick}) =>
    (<Button
        onClick={onClick}
        disabled={active}>
            {children}
        </Button>)

Link.defaultProps = {
    onClick: Function.prototype,
    active: false,
    children: ''
}

Link.propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.bool,
    children: PropTypes.node
}

export default Link