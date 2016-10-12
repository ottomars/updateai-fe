import './index.css'
import {connect} from 'react-redux'
import {starItem, unstarItem, upVoteItem, downVoteItem} from '../../state/items'
import ExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import IconButton from 'material-ui/IconButton'
import React from 'react'
import ShareIcon from 'material-ui/svg-icons/social/share'
import StarBorderIcon from 'material-ui/svg-icons/toggle/star-border'
import StarIcon from 'material-ui/svg-icons/toggle/star'

const ItemMedia = ({image}) => (
  <div className='Item-media' style={{backgroundImage: `url(${image})`}}></div>
)

const mapDispatchToProps = (dispatch) => ({
  starItem: id => dispatch(starItem(id)),
  unstarItem: id => dispatch(unstarItem(id)),
  upVoteItem: id => dispatch(upVoteItem(id)),
  downVoteItem: id => dispatch(downVoteItem(id))
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
  parentFeedTag,
  isMyFeed,
  starItem,
  unstarItem,
  upVoteItem,
  downVoteItem
}) => (
  <a className='Item' href={uri} target='_blank'>
    {image && <ItemMedia image={image} />}
    <p className='Item-text'>{text}</p>
    <div className='Item-info'>
      <p className='Item-createdAtAndHostName'>{createdAtRel} via {hostname}</p>
      {isMyFeed && (<p className='Item-feedTag'>{parentFeedTag}</p>)}
    </div>
    <div className='Item-bottom'>
      <div className='Item-upvotes'>
        <IconButton
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            downVoteItem(id)
          }}
          iconStyle={{width: 28, height: 28}}
          style={{width: 28, height: 28, padding: 0}}
        >
          <ExpandMoreIcon color='#ccc'/>
        </IconButton>
        <p className='Item-upvotesValue'>{upvotes}</p>
        <IconButton
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            upVoteItem(id)
          }}
          iconStyle={{width: 28, height: 28}}
          style={{width: 28, height: 28, padding: 0}}
        >
          <ExpandLessIcon color='#ccc'/>
        </IconButton>
      </div>
      <div className='Item-share'>
        <p className='Item-shareText'>Share</p>
        <IconButton
          iconStyle={{width: 28, height: 28}}
          style={{width: 28, height: 28, padding: 0}}
        >
          <ShareIcon color='#ccc'/>
        </IconButton>
      </div>
      <div className='Item-star'>
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
          {starred ? (<StarIcon color='#E5AA17'/>) : (<StarBorderIcon color='#ccc'/>)}
        </IconButton>
      </div>
    </div>
  </a>
)

export default connect(
  null,
  mapDispatchToProps
)(Item)
