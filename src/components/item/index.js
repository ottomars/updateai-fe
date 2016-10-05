import './index.css'
import React from 'react'

const itemMedia = image => (
  <div
    className='Item-media'
    style={{backgroundImage: `url(${image})`}}
  ></div>
)

const Item = ({id, text, image, createdAtRel, hostname, uri}) => (
  <a className='Item' href={uri} target='_blank'>
    {image && itemMedia(image)}
    <p className='Item-text'>{text}</p>
    <p className='Item-info'>{createdAtRel} via {hostname}</p>
  </a>
)

export default Item
