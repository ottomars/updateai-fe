import './index.css'
import {connect} from 'react-redux'
import {getActiveFeeds} from '../../state/activeFeeds'
import cn from 'classnames'
import React from 'react'

const mapStateToProps = state => ({
  feeds: getActiveFeeds(state)
})

const Header = ({feeds, children}) => (
  <div className={cn('Header', {'Header-moreThanThreeFeeds': feeds.length > 3})}>
    <div className='Header-inner'>
      {children}
    </div>
  </div>
)

Header.propTypes = {
  children: React.PropTypes.node.isRequired
}

export default connect(
  mapStateToProps
)(Header)
