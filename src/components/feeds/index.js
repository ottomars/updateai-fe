import './index.css'
import {connect} from 'react-redux'
import {getActiveFeeds} from '../../state/activeFeeds'
import Feed from '../feed'
import React from 'react'

const mapStateToProps = state => ({
  feeds: getActiveFeeds(state)
})

const Feeds = ({feeds}) => (
  <div className='Feeds'>
    {feeds.map(({id, title}) => (
      <Feed
        key={id}
        id={id}
        title={title}
      />
    ))}
  </div>
)

export default connect(
  mapStateToProps
)(Feeds)
