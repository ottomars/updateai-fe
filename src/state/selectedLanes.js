import {createSelector} from 'reselect'
import {getLanes} from './lanes'

// Reducer

export default (state = [], action = {}) => {
  switch (action.type) {
    case 'SELECT_LANE':
      return [...state, action.id]
    case 'DESELECT_LANE':
      const index = state.indexOf(action.id)
      return [...state.slice(0, index), ...state.slice(index + 1)]
    default:
      return state
  }
}

// Actions

export const selectLane = id => ({type: 'SELECT_LANE', id})

export const deselectLane = id => ({type: 'DESELECT_LANE', id})

export const toggleLane = (feedId, laneId) => (dispatch, getState) => {
  const {selectedLanes} = getState()
  if (selectedLanes.includes(laneId)) {
    dispatch(deselectLane(laneId))
  } else {
    dispatch(selectLane(laneId))
  }
}

// Selectors

export const getSelectedLaneIds = state => state.selectedLanes

export const getSelectedLanes = createSelector(
  getLanes,
  getSelectedLaneIds,
  (lanes, selectedIds) => selectedIds.map(id => lanes[id])
)
