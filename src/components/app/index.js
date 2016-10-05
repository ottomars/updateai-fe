import './index.css'
import FeedNav from '../feed-nav'
import Header from '../header'
import Feeds from '../feeds'
import Logo from '../logo'
import React from 'react'

const App = () => (
  <div className='App'>
    <Header>
      <Logo />
      <FeedNav />
    </Header>
    <Feeds />
  </div>
)

export default App
