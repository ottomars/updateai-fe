import './index.css'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {getSelectedFeeds} from '../../state/selectedFeeds'
import {getFeedLaneMap} from '../../state/feeds'
import {toggleLane, getSelectedLanes} from '../../state/selectedLanes'
import FeedNavButton from '../feed-nav-button'
import React from 'react'

const getButtons = createSelector(
  getSelectedFeeds,
  getSelectedLanes,
  getFeedLaneMap,
  (feeds, lanes, feedLaneMap) => (feeds.map(feed => {
    return {
      label: feed.title,
      feedId: feed.id,
      active: !!lanes.find(lane => lane.feed === feed.id),
      laneId: feedLaneMap.get(feed.id)
    }
  }))
)

const mapStateToProps = (state) => ({
  buttons: getButtons(state)
})

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick (feedId, laneId) {
      dispatch(toggleLane(feedId, laneId))
    }
  }
}

const FeedNav = ({buttons, onButtonClick}) => (
  <div className='FeedNav'>
    {buttons.map(({label, feedId, laneId, active}) => (
      <FeedNavButton
        active={active}
        feedId={feedId}
        key={feedId}
        label={label}
        laneId={laneId}
        onButtonClick={onButtonClick}
      />
    ))}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedNav)
