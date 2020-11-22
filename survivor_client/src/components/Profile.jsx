import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { logoutUser } from '../redux/actions/userActions'

const styles = theme => ({
  ...theme.spreadThis,
  profileBody: {
    position: 'relative',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 500,
    width: 200,
    overflow: 'scroll',
  },
  button: {
    height: 40,
    margin: '0px auto 8px auto',
    width: '80%',
  },
})

class Profile extends Component {
  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    const {
      classes,
      user: { voteHistory, credentials },
    } = this.props

    let voteHistoryMarkup = voteHistory
      .filter(vote => {
        if ((vote.voteDay = 0)) {
          return false
        } else return true
      })
      .map((vote, index) => (
        <Typography variant='h6' key={index}>
          {vote.name}
        </Typography>
      ))

    return (
      <Paper className={classes.profileBody} elevation={5}>
        {credentials.type === 'admin' ? (
          <Button
            component={Link}
            to='/admin'
            variant='contained'
            className={classes.button}
          >
            Admin Page
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          color='primary'
          variant='contained'
          className={classes.button}
          onClick={this.handleLogout}
        >
          Log Out
        </Button>
        <Typography variant='h5'>Vote History: </Typography>
        <Typography variant='body2'></Typography>
        {voteHistoryMarkup}
      </Paper>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Profile)
)
