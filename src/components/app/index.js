import './index.css'
import Nav from '../nav'
import Feeds from '../feeds'
import Search from '../search'
import Header from '../header'
import Logo from '../logo'
import React from 'react'

const App = () => (
  <div className='App'>
    <Header>
      <Logo />
      <Nav />
      <Search />
    </Header>
    <Feeds />
  </div>
)

export default App
