// Reducer

export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'STAR_ITEM':
      {
        const {id} = action
        return {
          ...state,
          [id]: {
            ...state[id],
            starred: true
          }
        }
      }
    case 'UNSTAR_ITEM':
      {
        const {id} = action
        return {
          ...state,
          [id]: {
            ...state[id],
            starred: false
          }
        }
      }
    default: return state
  }
}

// Selectors

export const getItems = state => state.items

// Actions

export const starItem = id => ({type: 'STAR_ITEM', id})

export const unstarItem = id => ({type: 'UNSTAR_ITEM', id})
