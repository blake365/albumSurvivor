import React, { Component } from 'react'

import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'

class ErrorAlert extends Component {
  state = {
    open: true,
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleClose()
    }, 10000)
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  render() {
    const { errors } = this.props

    return (
      <Collapse in={this.state.open}>
        <Alert
          severity='error'
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
          <AlertTitle>Error</AlertTitle>
          {errors.error}
        </Alert>
      </Collapse>
    )
  }
}

export default ErrorAlert
