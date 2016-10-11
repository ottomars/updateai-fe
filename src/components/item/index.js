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
  starred
}) => (
  <a className='Item' href={uri} target='_blank'>
    {image && <ItemMedia image={image} />}
    <p className='Item-text'>{text}</p>
    <p className='Item-info'>{createdAtRel} via {hostname}</p>
    <div className="Item-bottom">
      <p className="Item-upvotes">Upvotes {upvotes}</p>
      <p className="Item-upvotes">Comments {comments.length}</p>
      <p className="Item-upvotes">Starred {starred ? 'yes' : 'no'}</p>
    </div>
  </a>
)

export default Item
