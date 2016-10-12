import './index.css'
import {
  LIVE_SORTING,
  DAY_SORTING,
  WEEK_SORTING,
  MONTH_SORTING,
  YEAR_SORTING,
  ALL_TIME_SORTING
} from '../../constants'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {deselectFeed} from '../../state/selectedFeeds'
import {getFeeds, setFeedPage, setFeedSorting} from '../../state/feeds'
import {getItems} from '../../state/items'
import {liveSort, daySort, weekSort, monthSort, yearSort, allTimeSort} from '../../utils/sorting'
import {moveFeedLeft, moveFeedRight} from '../../state/activeFeeds'
import FeedActions from '../feed-actions'
import FeedPages from '../feed-pages'
import Items from '../items'
import React from 'react'

const sortFuncs = {
  [LIVE_SORTING]: liveSort,
  [DAY_SORTING]: daySort,
  [WEEK_SORTING]: weekSort,
  [MONTH_SORTING]: monthSort,
  [YEAR_SORTING]: yearSort,
  [ALL_TIME_SORTING]: allTimeSort
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

const getStarred = state => state.filters.starred

const getFilteredItemsForFeed = createSelector(
  getItemsForFeed,
  getStarred,
  (items, starred) => {
    if (starred) {
      return items.filter(item => item.starred)
    } else {
      return items
    }
  }
)

const getSortedItems = createSelector(
  getFilteredItemsForFeed,
  getSortingProp,
  (items, sorting) => sortFuncs[sorting](items)
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
      <p className='Feed-title'>{feed.title}</p>
      <div className='Feed-actions'>
        <FeedActions
          sorting={feed.sorting}
          onMoveLeftClick={moveFeedLeft}
          onMoveRightClick={moveFeedRight}
          onDeselectClick={deselectFeed}
          onSortClick={setFeedSorting}
        />
      </div>
    </div>
    <Items items={items} isMyFeed={feed.isMyFeed} />
    {items.length === 0 && (<p className='Feed-noResults'>no results</p>)}
    {numPages > 1 && (<FeedPages numPages={numPages} page={feed.page} onPageButtonClick={setFeedPage}/>)}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
