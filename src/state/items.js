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
    case 'UP_VOTE_ITEM':
      {
        const {id} = action
        const {origUpvotes} = state[id]
        return {
          ...state,
          [id]: {
            ...state[id],
            upvotes: origUpvotes + 1,
            voted: true
          }
        }
      }
    case 'DOWN_VOTE_ITEM':
      {
        const {id} = action
        const {origUpvotes} = state[id]
        return {
          ...state,
          [id]: {
            ...state[id],
            upvotes: origUpvotes - 1,
            voted: true
          }
        }
      }
    case 'SET_ITEM_VISITED':
      {
        const {id} = action
        return {
          ...state,
          [id]: {
            ...state[id],
            visited: true
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

export const upVoteItem = id => ({type: 'UP_VOTE_ITEM', id})

export const downVoteItem = id => ({type: 'DOWN_VOTE_ITEM', id})

export const setItemVisited = id => ({type: 'SET_ITEM_VISITED', id})
