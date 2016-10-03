import './index.css';
import {connect} from 'react-redux'
import React from 'react';

const mapStateToProps = (state) => {
  const {feeds, selectedFeeds} = state
  return {
    feeds: selectedFeeds.map(id => feeds[id])
  }
}

const FeedSwitcher = ({feeds}) => {
  return (
    <div className="FeedSwitcher">
      <a className="FeedSwitcher-button is-active">My Feed</a>
      {feeds.map(feed => (
        <a className="FeedSwitcher-button" key={feed.id}>{feed.title}</a>
      ))}
    </div>
  )
}

export default connect(mapStateToProps)(FeedSwitcher)
