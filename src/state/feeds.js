// Reducer

export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'SET_FEED_PAGE':
      const {page, id} = action
      return {
        ...state,
        [id]: {
          ...state[id],
          page
        }
      }
    default: return state
  }
}

// Selectors

export const getFeeds = state => state.feeds

// Actions

export const setFeedPage = (page, id) => ({type: 'SET_FEED_PAGE', id, page})
