import './index.css'
import {connect} from 'react-redux'
import {starItem, unstarItem, upVoteItem, downVoteItem, setItemVisited, toggleItemCommentsOpen} from '../../state/items'
import cn from 'classnames'
import ExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import IconButton from 'material-ui/IconButton'
import React from 'react'
import ShareIcon from 'material-ui/svg-icons/social/share'
import StarBorderIcon from 'material-ui/svg-icons/toggle/star-border'
import StarIcon from 'material-ui/svg-icons/toggle/star'
import CommentIcon from 'material-ui/svg-icons/communication/comment'

const ItemMedia = ({image}) => (
  <div className='Item-media' style={{backgroundImage: `url(${image})`}}></div>
)

const mapDispatchToProps = (dispatch) => ({
  starItem: id => dispatch(starItem(id)),
  unstarItem: id => dispatch(unstarItem(id)),
  upVoteItem: id => dispatch(upVoteItem(id)),
  downVoteItem: id => dispatch(downVoteItem(id)),
  setItemVisited: id => dispatch(setItemVisited(id)),
  toggleItemCommentsOpen: id => dispatch(toggleItemCommentsOpen(id))
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
  downVoteItem,
  setItemVisited,
  visited,
  upVoted,
  downVoted,
  toggleItemCommentsOpen,
  commentsOpen
}) => (
  <div className={cn('Item', {'Item--visited': visited, 'Item--voted': upVoted || downVoted})}>
    <a className='Item-link' href={uri} target='_blank' onClick={e => {
      setItemVisited(id)
    }}>
      {image && <ItemMedia image={image} />}
      <p className='Item-text'>{text}</p>
    </a>
    <div className='Item-info'>
      <p className='Item-createdAtAndHostName'>{createdAtRel} via {hostname}</p>
      {isMyFeed && (<p className='Item-feedTag'>{parentFeedTag}</p>)}
    </div>
    <div className='Item-actions'>
      <div className='Item-upvotes'>
        <IconButton
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            upVoteItem(id)
          }}
          iconStyle={{width: 36, height: 36}}
          style={{width: 36, height: 36, padding: 0}}
        >
          <ExpandLessIcon color={upVoted ? '#333' : '#999'} />
        </IconButton>
        <p className='Item-upvotesValue'>{upvotes}</p>
        <IconButton
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            downVoteItem(id)
          }}
          iconStyle={{width: 36, height: 36}}
          style={{width: 36, height: 36, padding: 0}}
        >
          <ExpandMoreIcon color={downVoted ? '#333' : '#999'}/>
        </IconButton>
      </div>
      <div className='Item-share'>
        <IconButton
          iconStyle={{width: 22, height: 22}}
          style={{width: 22, height: 22, padding: 0}}
        >
          <ShareIcon color='#999'/>
        </IconButton>
      </div>
      <div className='Item-commentsButton'>
        <IconButton
          onClick={e => {
            e.preventDefault()
            toggleItemCommentsOpen(id)
          }}
          iconStyle={{width: 22, height: 22}}
          style={{width: 22, height: 22, padding: 0}}
        >
          <CommentIcon color='#999'/>
        </IconButton>
        <p className='Item-commentsButtonText'>{comments} comments</p>
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
          iconStyle={{width: 30, height: 30}}
          style={{width: 30, height: 30, padding: 0}}
        >
          {starred ? (<StarIcon color='#E5AA17'/>) : (<StarBorderIcon color='#ccc'/>)}
        </IconButton>
      </div>
    </div>
    <div className={cn('Item-comments', {'is-open': commentsOpen})}>
      <p className='Item-comment'><span className='Item-commentUser'>@JosephTryn</span> This was expected. See my post on the wiki for details...</p>
      <p className='Item-comment'><span className='Item-commentUser'>@TimPierce</span> Do you think they are in trouble? I'm actually quite optimistic.</p>
      <p className='Item-comment'><span className='Item-commentUser'>@JosephTryn</span> They will get over it. Did you see the news on the new product?</p>
      <p className='Item-comment'><span className='Item-commentUser'>@TimPierce</span> Yes. Let's have @AndrewJosh take a look at it</p>
      <p className='Item-loadMoreComments'>Load more comments...</p>
    </div>
  </div>
)

export default connect(
  null,
  mapDispatchToProps
)(Item)
