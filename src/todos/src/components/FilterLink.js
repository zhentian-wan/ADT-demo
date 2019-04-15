import {connect} from 'react-redux'
import Link from './controls/Link'
import {safeDispatch} from '../js/helper'

const mapProps = (state, own) => ({
    active: state[own.filterState] === own.filter
})

const mapDispatch = (dispatch, own) => ({
    onClick: () => {
        const {applyFilter, filter} = own;
        safeDispatch(dispatch, applyFilter, filter)
    }
})

export default connect(mapProps, mapDispatch)(Link)