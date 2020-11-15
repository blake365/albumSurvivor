import React, { Component } from 'react'
import { connect } from 'react-redux'

import MessageAlert from './alerts/MessageAlert'
import InfoAlert from './alerts/InfoAlert'
import ErrorAlert from './alerts/ErrorAlert'
import withStyles from '@material-ui/core/styles/withStyles'

//TODO: handle errors and success messages in this component

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

  render() {
    const {
      classes,
      data: { message },
      UI: { errors },
    } = this.props

    let messageMarkup = function () {
      if (errors?.error) {
        return <ErrorAlert errors={errors} />
      } else if (message?.message) {
        return <MessageAlert message={message} />
      } else {
        return <InfoAlert />
      }
    }

    return <div className={classes.messageSlot}>{messageMarkup()}</div>
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
  data: state.data,
})

export default connect(mapStateToProps)(withStyles(styles)(MessageSlot))