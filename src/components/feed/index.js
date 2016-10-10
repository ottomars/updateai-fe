import './index.css'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {getFeeds, setFeedPage} from '../../state/feeds'
import {getItems} from '../../state/items'
import {LIVE_SORTING} from '../../constants'
import chunk from 'lodash/fp/chunk'
import FeedHeader from '../feed-header'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import Items from '../items'
import PageSelector from '../page-selector'
import React from 'react'
import reverse from 'lodash/fp/reverse'
import sortBy from 'lodash/fp/sortBy'

const paginate = chunk(7)

const liveSorting = flow(
  sortBy(get('createdAtTime')),
  reverse,
  paginate
)

const sorter = {
  [LIVE_SORTING]: liveSorting
}

const getIdProp = (state, {feed: {id}}) => id
const getPageProp = (state, {feed: {page}}) => page
const getSortingProp = (state, {feed: {sorting}}) => sorting

const getItemsForFeed = createSelector(
  getItems,
  getFeeds,
  getIdProp,
  (items, feeds, id) => {
    const feed = feeds[id]
    return feed.isMyFeed
      ? Object.keys(items).map(id => items[id])
      : feed.items.map(id => items[id])
  }
)

const getSortedItems = createSelector(
  getItemsForFeed,
  getSortingProp,
  (items, sorting) => sorter[sorting](items) || []
)

const getItemsForPage = createSelector(
  getSortedItems,
  getPageProp,
  (items, page) => items[page] || []
)

const getNumPages = createSelector(
  getSortedItems,
  items => items.length
)

const mapStateToProps = (state, props) => ({
  items: getItemsForPage(state, props),
  numPages: getNumPages(state, props)
})

const mapDispatchToProps = (dispatch, props) => ({
  onPageButtonClick: (e, page) => {
    e.preventDefault()
    dispatch(setFeedPage(page, props.feed.id))
  }
})

const Feed = ({feed, items, numPages, onPageButtonClick}) => (
  <div className='Feed'>
    <FeedHeader {...feed}/>
    <Items items={items} />
    <PageSelector numPages={numPages} page={feed.page} onPageButtonClick={onPageButtonClick}/>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
