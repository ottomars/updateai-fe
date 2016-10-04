import './index.css'

import FeedNav from '../feed-nav'
import Header from '../header'
import Logo from '../logo'
import React from 'react'

const App = () => (
  <div className='App'>
    <Header>
      <Logo />
      <FeedNav />
    </Header>
  </div>
)

export default App
