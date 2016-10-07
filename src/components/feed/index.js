import './index.css'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {getFeeds} from '../../state/feeds'
import {getItems} from '../../state/items'
import FeedHeader from '../feed-header'
import Items from '../items'
import React from 'react'

const getIdProp = (state, {id}) => id

const getFeedItems = createSelector(
  getItems,
  getFeeds,
  getIdProp,
  (items, feeds, id) => feeds[id].items.map(id => items[id])
)

const mapStateToProps = (state, props) => ({
  items: getFeedItems(state, props)
})

const Feed = feed => (
  <div className='Feed'>
    <FeedHeader {...feed}/>
    <Items items={feed.items} />
  </div>
)

export default connect(
  mapStateToProps
)(Feed)
