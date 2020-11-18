import React, { Component } from 'react'

import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'

class MessageAlert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
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
    const { message } = this.props

    return (
      <div>
        <Collapse in={this.state.open}>
          <Alert
            severity='success'
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
            <AlertTitle>Success</AlertTitle>
            {message.message}
          </Alert>
        </Collapse>
      </div>
    )
  }
}

export default MessageAlert
