import './index.css'
import {connect} from 'react-redux'
import {starItem, unstarItem} from '../../state/items'
import IconButton from 'material-ui/IconButton'
import React from 'react'
import StarBorderIcon from 'material-ui/svg-icons/toggle/star-border'
import StarIcon from 'material-ui/svg-icons/toggle/star'

const ItemMedia = ({image}) => (
  <div className='Item-media' style={{backgroundImage: `url(${image})`}}></div>
)

const mapDispatchToProps = (dispatch) => ({
  starItem: id => dispatch(starItem(id)),
  unstarItem: id => dispatch(unstarItem(id))
})

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
  isMyFeed,
  starItem,
  unstarItem
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
      <p className='Item-shareButton'>Comments {comments.length}</p>
      <div className='Item-starButton'>
        <IconButton
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            if (starred) {
              unstarItem(id)
            } else {
              starItem(id)
            }
          }}
          iconStyle={{width: 28, height: 28}}
          style={{width: 28, height: 28, padding: 0}}
        >
          {starred ? (<StarIcon color='#E5AA17'/>) : (<StarBorderIcon />)}
        </IconButton>
      </div>
    </div>
  </a>
)

export default connect(
  null,
  mapDispatchToProps
)(Item)
