import './index.css'
import React from 'react'

const ItemMedia = ({image}) => (
  <div className='Item-media' style={{backgroundImage: `url(${image})`}}></div>
)

const Item = ({
  id,
  text,
  image,
  createdAtRel,
  hostname,
  uri,
  upvotes,
  comments,
  starred,
  parentFeed,
  isMyFeed
}) => (
  <a className='Item' href={uri} target='_blank'>
    {image && <ItemMedia image={image} />}
    <p className='Item-text'>{text}</p>
    <div className='Item-info'>
      <p className='Item-createdAtAndHostName'>{createdAtRel} via {hostname}</p>
      {isMyFeed && (<p className='Item-feedTag'>{parentFeed}</p>)}
    </div>
    <div className='Item-bottom'>
      <p className='Item-upvotes'>Upvotes {upvotes}</p>
      <p className='Item-upvotes'>Comments {comments.length}</p>
      <p className='Item-upvotes'>Starred {starred ? 'yes' : 'no'}</p>
    </div>
  </a>
)

export default Item
