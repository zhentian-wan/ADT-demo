import React from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({ className, type, disabled, icon, onClick, children }) => {
    const classes = classnames('button', {
        'button-disabled': disabled,
        [className]: !!className
    })

    const content = icon ? <FontAwesomeIcon icon={icon} /> : children

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {content}
        </button>
    )
}

Button.defaultProps = {
    type: 'button',
    className: '',
    children: '',
    disabled: false,
    icon: null,
    onClick: Function.prototype
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    icon: PropTypes.object
}

export default Button
