import './index.css'
import classnames from 'classnames'
import React from 'react'

const FeedNavButton = ({label, feedId, laneId, active, onButtonClick}) => (
  <a className={classnames('FeedNavButton', {'is-active': active})}
    onClick={() => onButtonClick(feedId, laneId)}
  >{label}</a>
)

export default FeedNavButton
