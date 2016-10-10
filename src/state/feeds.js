// Reducer

export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'SET_FEED_PAGE':
      {
        const {page, id} = action
        return {
          ...state,
          [id]: {
            ...state[id],
            page
          }
        }
      }
    case 'SET_FEED_SORTING':
      {
        const {sorting, id} = action
        return {
          ...state,
          [id]: {
            ...state[id],
            page: 0,
            sorting
          }
        }
      }
    default: return state
  }
}

// Selectors

export const getFeeds = state => state.feeds

// Actions

export const setFeedPage = (page, id) => ({type: 'SET_FEED_PAGE', id, page})

export const setFeedSorting = (sorting, id) => ({type: 'SET_FEED_SORTING', id, sorting})
