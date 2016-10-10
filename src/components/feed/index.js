import './index.css'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {deselectFeed} from '../../state/selectedFeeds'
import {getFeeds, setFeedPage, setFeedSorting} from '../../state/feeds'
import {getItems} from '../../state/items'
import {LIVE_SORTING} from '../../constants'
import {paginate, liveSort} from '../../utils/sorting'
import {moveFeedLeft, moveFeedRight} from '../../state/activeFeeds'
import FeedActions from '../feed-actions'
import FeedPages from '../feed-pages'
import FeedSorting from '../feed-sorting'
import Items from '../items'
import React from 'react'

const sortFuncs = {
  [LIVE_SORTING]: liveSort
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
  (items, sorting) => {
    const sort = sortFuncs[sorting]
    return sort
      ? sort(items)
      : paginate(items)
  }
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

const mapDispatchToProps = (dispatch, {feed: {id}}) => ({
  setFeedPage: page => dispatch(setFeedPage(page, id)),
  setFeedSorting: sorting => dispatch(setFeedSorting(sorting, id)),
  moveFeedLeft: () => dispatch(moveFeedLeft(id)),
  moveFeedRight: () => dispatch(moveFeedRight(id)),
  deselectFeed: () => dispatch(deselectFeed(id))
})

const Feed = ({
  feed,
  items,
  numPages,
  setFeedPage,
  setFeedSorting,
  moveFeedLeft,
  moveFeedRight,
  deselectFeed
}) => (
  <div className='Feed'>
    <div className='Feed-top'>
      <div className='Feed-topInner'>
        <p className='Feed-title'>{feed.title}</p>
        <div className='Feed-actions'>
          <FeedActions
            onMoveLeftClick={moveFeedLeft}
            onMoveRightClick={moveFeedRight}
            onDeselectClick={deselectFeed}
          />
        </div>
      </div>
      <div className='Feed-sorting'>
        <FeedSorting sorting={feed.sorting} onSortButtonClick={setFeedSorting}/>
      </div>
    </div>
    <Items items={items} />
    <FeedPages numPages={numPages} page={feed.page} onPageButtonClick={setFeedPage}/>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
