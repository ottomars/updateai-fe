import {createSelector} from 'reselect'
import {getFeeds} from './feeds'

// Reducer

export default (state = [], action) => {
  switch (action.type) {
    case 'MOVE_FEED_LEFT':
      {
        const index = state.indexOf(action.id)
        if (index < 1) return state
        const toIndex = index - 1;
        const without = [...state.slice(0, index), ...state.slice(index + 1)]
        if (toIndex === 0) {
          return [action.id, ...without]
        } else {
          return [
            ...without.slice(0, toIndex),
            action.id,
            ...without.slice(toIndex)
          ]
        }
      }
    case 'MOVE_FEED_RIGHT':
      {
        const index = state.indexOf(action.id)
        if (index >= state.length - 1) return state
        const toIndex = index + 1;
        const without = [...state.slice(0, index), ...state.slice(index + 1)]
        if (toIndex === 0) {
          return [action.id, ...without]
        } else {
          return [
            ...without.slice(0, toIndex),
            action.id,
            ...without.slice(toIndex)
          ]
        }
      }
    case 'ACTIVATE_FEED':
      return [...state, action.id]
    case 'DEACTIVATE_FEED':
    case 'DESELECT_FEED':
      {
        const index = state.indexOf(action.id)
        return [...state.slice(0, index), ...state.slice(index + 1)]
      }
    default: return state
  }
}

// Actions

export const moveFeedLeft = id => ({type: 'MOVE_FEED_LEFT', id})

export const moveFeedRight = id => ({type: 'MOVE_FEED_RIGHT', id})

export const activateFeed = id => ({type: 'ACTIVATE_FEED', id})

export const deactivateFeed = id => ({type: 'DEACTIVATE_FEED', id})

export const toggleFeedActive = id => (dispatch, getState) => {
  if (getState().activeFeeds.includes(id)) {
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
