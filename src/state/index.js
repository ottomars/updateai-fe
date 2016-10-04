import {combineReducers} from 'redux'
import feeds from './feeds'
import items from './items'
import lanes from './lanes'
import selectedFeeds from './selectedFeeds'
import selectedLanes from './selectedLanes'

const rootReducer = combineReducers({
  feeds,
  items,
  lanes,
  selectedFeeds,
  selectedLanes
})

export default rootReducer
