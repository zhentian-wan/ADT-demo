import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'

const Button = ({className, type, disabled, onClick, children}) => {
    const classes = classnames('button', {
        'button-disabled': disabled,
        [className]: !!className
    })

    return (<button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}>
        {children}
    </button>)
}

Button.defaultProps = {
    type: 'button',
    className: '',
    children: '',
    disabled: false,
    onClick: Function.prototype
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}

export default Button