import './index.css'

import FeedSwitcher from '../feed-switcher'
import Header from '../header'
import Logo from '../logo'
import React from 'react'

const App = () => (
  <div className='App'>
    <Header>
      <Logo />
      <FeedSwitcher />
    </Header>
  </div>
)

export default App
