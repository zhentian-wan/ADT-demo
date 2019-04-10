import React from 'react'
import {connect} from 'react-redux'
import {updateFilter} from '../data/reducers/filterTodos'
import Link from './controls/Link'

const mapProps = (state, own) => ({
    active: state.todoFilter === own.filter
})

const mapDispatch = (dispatch, {filter}) => ({
    onClick: () => dispatch(updateFilter(filter))
})

export default connect(mapProps, mapDispatch)(Link)