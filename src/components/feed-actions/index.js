import './index.css'
import {
  SORT_LABELS
} from '../../constants'
import ChevronLeftIcon from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRightIcon from 'material-ui/svg-icons/navigation/chevron-right'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz'
import Popover from 'material-ui/Popover'
import React, {Component} from 'react'
import SentimentSatisfiedIcon from 'material-ui/svg-icons/social/sentiment-satisfied'
import ShareIcon from 'material-ui/svg-icons/social/share'
import SortIcon from 'material-ui/svg-icons/content/sort'

class FeedActions extends Component {

  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  onIconButtonTouchTap (e) {
    e.preventDefault()
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    })
  }

  onRequestClose () {
    this.setState({open: false})
  }

  onMoveLeftTouchTap (e) {
    e.preventDefault()
    this.setState({open: false})
    this.props.onMoveLeftClick(this.props.id)
  }

  onMoveRightTouchTap (e) {
    e.preventDefault()
    this.setState({open: false})
    this.props.onMoveRightClick(this.props.id)
  }

  onRemoveTouchTap (e) {
    e.preventDefault()
    this.setState({open: false})
    this.props.onDeselectClick(this.props.id)
  }

  onSortTouchTap (e, sortOption) {
    e.preventDefault()
    this.setState({open: false})
    this.props.onSortClick(sortOption, this.props.id)
  }

  getSortingMenuItems () {
    const {sorting} = this.props
    return Object
      .keys(SORT_LABELS)
      .map(sortOption => {
        const label = SORT_LABELS[sortOption]
        return (
          <MenuItem
            insetChildren={true}
            primaryText={label}
            onTouchTap={e => this.onSortTouchTap(e, sortOption)}
            checked={sorting === sortOption}
          />
        )
      })
  }

  render () {
    return (
      <div className='FeedActions'>
        <IconButton
          onTouchTap={e => this.onIconButtonTouchTap(e)}
          iconStyle={{width: 36, height: 36}}
          style={{width: 36, height: 36, padding: 0}}
        >
          <MoreHorizIcon color='#1f5acc'/>
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.onRequestClose()}
        >
          <Menu>
            <MenuItem primaryText="Share" leftIcon={<ShareIcon />} />
            <MenuItem primaryText="Give feedback" leftIcon={<SentimentSatisfiedIcon />} />
            <Divider />
            <MenuItem
              primaryText="Sort by"
              leftIcon={<SortIcon />}
              rightIcon={<ChevronRightIcon />}
              menuItems={this.getSortingMenuItems()}
            />
            <Divider />
            <MenuItem
              primaryText="Move left"
              leftIcon={<ChevronLeftIcon />}
              onTouchTap={e => this.onMoveLeftTouchTap(e)}
            />
            <MenuItem
              primaryText="Move right"
              leftIcon={<ChevronRightIcon />}
              onTouchTap={e => this.onMoveRightTouchTap(e)}
            />
            <Divider />
            <MenuItem
              primaryText="Remove"
              leftIcon={<DeleteIcon />}
              onTouchTap={e => this.onRemoveTouchTap(e)}
            />
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default FeedActions
