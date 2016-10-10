import {createSelector} from 'reselect'
import {getFeeds} from './feeds'

// Reducer

export default (state = [], action = {}) => {
  switch (action.type) {
    case 'SELECT_FEED':
      return [...state, action.id]
    case 'DESELECT_FEED':
      const index = state.indexOf(action.id)
      return [...state.slice(0, index), ...state.slice(index + 1)]
    default: return state
  }
}

// Actions

export const selectFeed = id => ({type: 'SELECT_FEED', id})

export const deselectFeed = id => ({type: 'DESELECT_FEED', id})

// Selectors

export const getSelectedFeedIds = state => state.selectedFeeds

export const getSelectedFeeds = createSelector(
  getFeeds,
  getSelectedFeedIds,
  (feeds, selectedIds) => selectedIds.map(id => feeds[id])
)
