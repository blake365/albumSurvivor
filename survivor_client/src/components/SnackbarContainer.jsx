import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { clearAllAlerts } from '../redux/actions/uiActions'

const styles = theme => ({
  ...theme.spreadThis,
  messageSlot: {},
})

class MessageSlot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      open: true,
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.props.clearAllAlerts()
    // this.setState({ open: false })
  }

  render() {
    const {
      UI: { errors, message },
    } = this.props
    const { open } = this.state

    let snackbarMarkup = errors?.error ? (
      <Snackbar
        onClose={this.handleClose}
        // style={{ marginTop: 10 }}
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='error' variant='filled'>
          {errors.error}
        </Alert>
      </Snackbar>
    ) : null

    let messageMarkup = message?.message ? (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={this.handleClose}
      >
        <Alert severity='success' variant='filled'>
          {message.message}
        </Alert>
      </Snackbar>
    ) : null

    return (
      <div>
        {snackbarMarkup}
        {messageMarkup}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { clearAllAlerts })(
  withStyles(styles)(MessageSlot)
)
