import React, { Component, Fragment } from 'react'

import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'

class InfoAlert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { update } = this.props
    let removedSong = {}
    let infoMarkup = () => {
      if (update) {
        removedSong = update[0]
        return (
          <Fragment>
            <AlertTitle>Welcome Back!</AlertTitle>
            <strong>{removedSong?.name} was the last song voted out</strong>
          </Fragment>
        )
      } else {
        return (
          <Fragment>
            <AlertTitle>Welcome!</AlertTitle>
            <div>
              You may vote one time per day. The day will reset at 7PM Eastern
              time.
            </div>
          </Fragment>
        )
      }
    }

    return (
      <div>
        <Collapse in={this.state.open}>
          <Alert
            severity='info'
            variant='filled'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                onClick={this.handleClose}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {infoMarkup()}
          </Alert>
        </Collapse>
      </div>
    )
  }
}

export default InfoAlert
