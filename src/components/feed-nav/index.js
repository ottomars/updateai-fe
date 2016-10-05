import './index.css'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {getSelectedFeeds} from '../../state/selectedFeeds'
import {getActiveFeedIds, toggleFeedActive} from '../../state/activeFeeds'
import FeedNavButton from '../feed-nav-button'
import React from 'react'

const getFeedNavButtonsState = createSelector(
  getSelectedFeeds,
  getActiveFeedIds,
  (feeds, activeIds) => (feeds.map(({title, id}) => ({
    label: title,
    id: id,
    active: activeIds.includes(id)
  })))
)

const mapStateToProps = (state) => ({
  buttons: getFeedNavButtonsState(state)
})

const mapDispatchToProps = (dispatch) => ({
  onButtonClick: (id) => dispatch(toggleFeedActive(id))
})

const FeedNav = ({buttons, onButtonClick}) => (
  <div className='FeedNav'>
    {buttons.map(({label, id, active}) => (
      <FeedNavButton
        active={active}
        id={id}
        key={id}
        label={label}
        onButtonClick={onButtonClick}
      />
    ))}
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedNav)
