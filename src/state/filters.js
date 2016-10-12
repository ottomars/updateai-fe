// Reducer

export default (state = {starred: false}, action = {}) => {
  switch (action.type) {
    case 'FILTER_STARRED':
      return {
        ...state,
        starred: true
      }
    case 'UNFILTER_STARRED':
      return {
        ...state,
        starred: false
      }
    default: return state
  }
}

// Actions

export const filterStarred = () => ({type: 'FILTER_STARRED'})

export const unfilterStarred = () => ({type: 'UNFILTER_STARRED'})
