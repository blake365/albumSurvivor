import React, { Component } from 'react'

import Popper from '@material-ui/core/Popper'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Profile from '../Profile'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

class ProfilePopper extends Component {
  state = {
    anchorEl: null,
    open: false,
  }
  handleClick = event => {
    this.state.anchorEl
      ? this.setState({ anchorEl: null, open: false })
      : this.setState({ anchorEl: event.currentTarget, open: true })
  }

  handleClickAway = () => {
    this.setState({ open: false, anchorEl: null })
  }

  render() {
    const { open, anchorEl } = this.state

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div>
          <IconButton
            color='inherit'
            aria-describedby='profile-popper'
            type='button'
            onClick={this.handleClick}
          >
            <AccountBoxIcon />
          </IconButton>
          <Popper
            id='profile-popper'
            open={open}
            anchorEl={anchorEl}
            placement='bottom-end'
            style={{
              position: 'absolute',
              zIndex: 1400,
            }}
          >
            <Profile />
          </Popper>
        </div>
      </ClickAwayListener>
    )
  }
}

export default ProfilePopper
