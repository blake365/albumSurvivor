import React, { Component } from 'react'

import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'

class InfoAlert extends Component {
  state = {
    open: true,
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  render() {
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
                size='large'
                onClick={this.handleClose}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            <AlertTitle>Info</AlertTitle>
            You may vote one time per day.
          </Alert>
        </Collapse>
      </div>
    )
  }
}

export default InfoAlert
