import {combineReducers} from 'redux'
import feeds from './feeds'
import items from './items'
import selectedFeeds from './selectedFeeds'
import activeFeeds from './activeFeeds'

const rootReducer = combineReducers({
  activeFeeds,
  feeds,
  items,
  selectedFeeds
})

export default rootReducer
