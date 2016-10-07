import './index.css'
import {connect} from 'react-redux'
import {getActiveFeeds} from '../../state/activeFeeds'
import cn from 'classnames'
import Feed from '../feed'
import React from 'react'

const mapStateToProps = state => ({
  feeds: getActiveFeeds(state)
})

const Feeds = ({feeds}) => (
  <div className={cn('Feeds', {'Feeds--wide': feeds.length > 3})}>
    <div className='Feeds-inner'>
      {feeds.map(feed => (
        <div key={feed.id} className='Feeds-feed'>
          <Feed {...feed}/>
        </div>
      ))}
    </div>
  </div>
)

export default connect(
  mapStateToProps
)(Feeds)
