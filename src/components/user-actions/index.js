import './index.css'
import {connect} from 'react-redux'
import {filterStarred, unfilterStarred} from '../../state/filters'
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import Divider from 'material-ui/Divider'
import FaceIcon from 'material-ui/svg-icons/action/face'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import React, {Component} from 'react'
import StarBorderIcon from 'material-ui/svg-icons/toggle/star-border'
import StarIcon from 'material-ui/svg-icons/toggle/star'

const mapStateToProps = (state) => ({starred: state.filters.starred})

const mapDispatchToProps = (dispatch) => ({
  filterStarred: () => dispatch(filterStarred()),
  unfilterStarred: () => dispatch(unfilterStarred())
})

class UserActions extends Component {

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

  onToggleStarred (e) {
    e.preventDefault()
    if (this.props.starred) {
      this.props.unfilterStarred()
    } else {
      this.props.filterStarred()
    }
    this.setState({open: false})
  }

  render () {
    const {starred} = this.props
    return (
      <div className='UserActions'>
        <IconButton
          onTouchTap={e => this.onIconButtonTouchTap(e)}
          iconStyle={{width: 36, height: 36}}
          style={{width: 36, height: 36, padding: 0}}
        >
          <AccountCircleIcon color='#999'/>
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={() => this.onRequestClose()}
        >
          <Menu>
            <MenuItem primaryText="My Account" leftIcon={<FaceIcon />} />
            <MenuItem
              primaryText="Saved Updates"
              leftIcon={starred ? (<StarIcon color='#E5AA17'/>) : (<StarBorderIcon />)}
              onTouchTap={e => this.onToggleStarred(e)}
            />
            <Divider />
            <MenuItem
              primaryText="Log out"
              leftIcon={<CloseIcon />}
            />
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserActions)
