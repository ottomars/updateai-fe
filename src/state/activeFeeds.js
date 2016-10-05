import {createSelector} from 'reselect'
import {getFeeds} from './feeds'

// Reducer

export default (state = [], action) => {
  switch (action.type) {
    case 'ACTIVATE_FEED':
      return [...state, action.id]
    case 'DEACTIVATE_FEED':
      const index = state.indexOf(action.id)
      return [...state.slice(0, index), ...state.slice(index + 1)]
    default: return state
  }
}

// Actions

export const activateFeed = id => ({type: 'ACTIVATE_FEED', id})

export const deactivateFeed = id => ({type: 'DEACTIVATE_FEED', id})

export const toggleFeedActive = (id) => (dispatch, getState) => {
  const {activeFeeds} = getState()
  if (activeFeeds.includes(id)) {
    dispatch(deactivateFeed(id))
  } else {
    dispatch(activateFeed(id))
  }
}

// Selectors

export const getActiveFeedIds = state => state.activeFeeds

export const getActiveFeeds = createSelector(
  getFeeds,
  getActiveFeedIds,
  (feeds, activeIds) => activeIds.map(id => feeds[id])
)
