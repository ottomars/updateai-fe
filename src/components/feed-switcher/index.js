import './index.css'

import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {getFeeds} from '../../state/feeds'
import {getSelectedFeeds} from '../../state/selectedFeeds'
import {toggleFeedActive, getActiveFeeds} from '../../state/activeFeeds'
import classnames from 'classnames'
import React from 'react'

const getSelectedFeedsWithActivity = createSelector(
  getFeeds,
  getSelectedFeeds,
  getActiveFeeds,
  (feeds, selectedFeeds, activeFeeds) => {
    return selectedFeeds.map(id => ({
      ...feeds[id],
      isActive: activeFeeds.includes(id)
    }))
  }
)

const mapStateToProps = (state) => ({
  feeds: getSelectedFeedsWithActivity(state)
})

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick (id) {
      dispatch(toggleFeedActive(id))
    }
  }
}

const FeedSwitcher = ({feeds, onButtonClick}) => {
  return (
    <div className='FeedSwitcher'>
      <a className='FeedSwitcher-button is-active'>My Feed</a>
      {feeds.map(feed => (
        <a className={classnames('FeedSwitcher-button', {'is-active': feed.isActive})}
          key={feed.id}
          onClick={() => onButtonClick(feed.id)}
        >{feed.title}</a>
      ))}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedSwitcher)
