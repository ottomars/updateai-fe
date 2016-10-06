import './index.css'
import FeedNav from '../feed-nav'
import Feeds from '../feeds'
import FeedSelector from '../feed-selector'
import Header from '../header'
import Logo from '../logo'
import React from 'react'

const App = () => (
  <div className='App'>
    <Header>
      <Logo />
      <FeedNav />
      <FeedSelector />
    </Header>
    <Feeds />
  </div>
)

export default App
