import {createSelector} from 'reselect'
import {getFeeds} from './feeds'

export default (state = [], action) => {
  switch (action.type) {
    default: return state
  }
}

export const getSelectedFeedIds = state => state.selectedFeeds

export const getSelectedFeeds = createSelector(
  getFeeds,
  getSelectedFeedIds,
  (feeds, selectedIds) => selectedIds.map(id => feeds[id])
)
