import './index.css'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {getSelectedFeeds} from '../../state/selectedFeeds'
import {getActiveFeedIds, toggleFeedActive} from '../../state/activeFeeds'
import cn from 'classnames'
import React from 'react'

const getButtons = createSelector(
  getSelectedFeeds,
  getActiveFeedIds,
  (feeds, activeIds) => (feeds.map(({title, id}) => ({
    label: title,
    id: id,
    active: activeIds.includes(id)
  })))
)

const mapStateToProps = (state) => ({
  buttons: getButtons(state)
})

const mapDispatchToProps = (dispatch) => ({
  onButtonClick: (id) => dispatch(toggleFeedActive(id))
})

const NavButton = ({label, id, active, onButtonClick}) => (
  <a className={cn('Nav-button', {'is-active': active})}
    onClick={e => {
      e.preventDefault()
      onButtonClick(id)
    }}
  >{label}</a>
)

const Nav = ({buttons, onButtonClick}) => (
  <div className='Nav'>
    {buttons.map(({label, id, active}) => (
      <NavButton
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
)(Nav)
