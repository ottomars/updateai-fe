import './index.css'
import React from 'react'

const Footer = ({children}) => (
  <div className='Footer'>
    <div className='Footer-inner'>
      <p className='Footer-item'>About</p>
      <p className='Footer-item'>Terms & Conditions</p>
      <p className='Footer-item'>Share feedback <a href='mailto:comments@avilio.com'>comments@avilio.com</a></p>
    </div>
  </div>
)

export default Footer
