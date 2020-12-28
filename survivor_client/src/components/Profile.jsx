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
    padding: 10,
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

    let voteHistoryMarkup =
      voteHistory.length <= 1
        ? 'Go cast your first vote!'
        : voteHistory
            .filter(vote => {
              if (vote.trackId === 123) {
                return false
              } else return true
            })
            .sort(function (a, b) {
              // console.log(a.voteOutDay._seconds)
              return b.createdAt - a.createdAt
            })
            .map((vote, index) => (
              <div
                key={index}
                style={{ display: 'flex', alignContent: 'center', margin: 3 }}
              >
                <img
                  alt='album art'
                  src={vote.albumArt}
                  style={{ height: 40, width: 40, marginRight: 5 }}
                />
                <Typography style={{ lineHeight: '40px' }} key={index}>
                  {vote.name}
                </Typography>
              </div>
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
        <Typography variant='h5' align='center'>
          Vote History
        </Typography>
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
