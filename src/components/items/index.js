import './index.css'
import Item from '../item'
import React from 'react'

const Items = ({items}) => (
  <div className='Items'>
    {items.map(item => (
      <Item
        key={item.id}
        {...item}
      />
    ))}
  </div>
)

export default Items
