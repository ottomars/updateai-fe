import './index.css'
import React from 'react'
import logoMedia from './logo.jpg'

const Logo = ({children}) => (
  <a className='Logo'>
    <img src={logoMedia} className='Logo-media' role='presentation' />
    <p className='Logo-text'>UpdateAI</p>
  </a>
)

export default Logo
