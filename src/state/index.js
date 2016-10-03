import {combineReducers} from 'redux'
import activeFeeds from './activeFeeds'
import feeds from './feeds'
import items from './items'
import selectedFeeds from './selectedFeeds'

const rootReducer = combineReducers({
  activeFeeds,
  feeds,
  items,
  selectedFeeds
})

export default rootReducer
