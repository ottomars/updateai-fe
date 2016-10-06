import './index.css'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {getFeeds} from '../../state/feeds'
import {getSelectedFeedIds, selectFeed} from '../../state/selectedFeeds'
import AutoComplete from 'material-ui/AutoComplete'
import React from 'react'
import Search from 'material-ui/svg-icons/action/search'

const getDataSource = createSelector(
  getFeeds,
  getSelectedFeedIds,
  (feeds, selectedFeedIds) => {
    const dataSource = Object.keys(feeds)
      .filter(id => !selectedFeedIds.includes(id))
      .map(id => feeds[id])
      .map(feed => ({text: feed.title, value: feed.id}))
    return dataSource
  }
)

const mapStateToProps = (state) => ({
  dataSource: getDataSource(state)
})

const mapDispatchToProps = (dispatch) => ({
  onNewRequest: ({value}) => value && dispatch(selectFeed(value))
})

const FeedSelector = ({dataSource, onNewRequest}) => (
  <div className='FeedSelector'>
    <div className='FeedSelector-searchIcon'>
      <Search color='#ccc' />
    </div>
    <AutoComplete
      hintText='Search feeds'
      dataSource={dataSource}
      openOnFocus={true}
      fullWidth={true}
      menuCloseDelay={0}
      filter={AutoComplete.fuzzyFilter}
      underlineFocusStyle={{borderColor: '#f558bf'}}
      onNewRequest={onNewRequest}
    />
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedSelector)
