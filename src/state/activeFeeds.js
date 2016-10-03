const TOGGLE_FEED_ACTIVE = 'TOGGLE_FEED_ACTIVE'

export default (state = [], action) => {
  switch (action.type) {
    case TOGGLE_FEED_ACTIVE:
      const index = state.indexOf(action.id)
      return index > -1
        ? [...state.slice(0, index), ...state.slice(index + 1)]
        : [...state, action.id]
    default:
      return state
  }
}

export const toggleFeedActive = id => (
  {type: TOGGLE_FEED_ACTIVE, id}
)

export const getActiveFeeds = state => state.activeFeeds
