import { combineReducers } from '../helper'
import todo from './todo'

const reducers = combineReducers([todo])
const reducer = (prevState, action) => reducers(action).execWith(prevState)

export default reducer
