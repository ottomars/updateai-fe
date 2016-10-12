import './index.css'
import Item from '../item'
import React from 'react'

const Items = ({items, isMyFeed}) => (
  <div className='Items'>
    {items.map(item => (
      <Item
        key={item.id}
        {...item}
        isMyFeed={isMyFeed}
      />
    ))}
  </div>
)

export default Items
