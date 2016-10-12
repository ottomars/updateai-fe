import {combineReducers} from 'redux'
import activeFeeds from './activeFeeds'
import feeds from './feeds'
import filters from './filters'
import items from './items'
import selectedFeeds from './selectedFeeds'

const rootReducer = combineReducers({
  activeFeeds,
  feeds,
  filters,
  items,
  selectedFeeds
})

export default rootReducer
