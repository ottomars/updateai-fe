import './index.css'
import classnames from 'classnames'
import React from 'react'

const FeedNavButton = ({label, id, active, onButtonClick}) => (
  <a className={classnames('FeedNavButton', {'is-active': active})}
    onClick={() => onButtonClick(id)}
  >{label}</a>
)

export default FeedNavButton
