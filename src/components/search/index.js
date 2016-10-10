import './index.css'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {getFeeds} from '../../state/feeds'
import {getSelectedFeedIds, selectFeed} from '../../state/selectedFeeds'
import AutoComplete from 'material-ui/AutoComplete'
import React from 'react'
import SearchIcon from 'material-ui/svg-icons/action/search'

const getDataSource = createSelector(
  getFeeds,
  getSelectedFeedIds,
  (feeds, selectedFeedIds) => (
    Object.keys(feeds)
      .filter(id => !selectedFeedIds.includes(id))
      .map(id => feeds[id])
      .map(feed => ({text: feed.title, value: feed.id}))
  )
)

const mapStateToProps = (state) => ({
  dataSource: getDataSource(state)
})

const mapDispatchToProps = (dispatch) => ({
  onNewRequest: ({value}) => value && dispatch(selectFeed(value))
})

const Search = ({dataSource, onNewRequest}) => (
  <div className='Search'>
    <div className='Search-icon'>
      <SearchIcon color='#ccc' />
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
)(Search)
