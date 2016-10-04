import {createSelector} from 'reselect'
import {getLanes} from './lanes'

// Reducer

export default (state = {}, action = {}) => {
  switch (action.type) {
    default: return state
  }
}

// Selectors

export const getFeeds = state => state.feeds

export const getFeedLaneMap = createSelector(
  getFeeds,
  getLanes,
  (feeds, lanes) => new Map(
    Object
      .keys(lanes)
      .map(key => lanes[key])
      .map(lane => [lane.feed, lane.id])
  )
)
