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
  <div className={cn('Feeds', {'Feeds-moreThanThreeFeeds': feeds.length > 3})}>
    <div className='Feeds-inner'>
      {feeds.map(({id, title}) => (
        <div key={id} className='Feeds-feed'>
          <Feed
            id={id}
            title={title}
          />
        </div>
      ))}
    </div>
  </div>
)

export default connect(
  mapStateToProps
)(Feeds)
