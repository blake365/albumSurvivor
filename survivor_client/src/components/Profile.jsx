import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...theme.spreadThis,
  profileBody: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

class Profile extends Component {
  render() {
    const {
      classes,
      UI: loading,
      user: { voteHistory },
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
      <Paper className={classes.profileBody}>
        <Typography variant='h5'>Your vote history: </Typography>
        <Typography variant='body1'>
          Votes cast: {voteHistory.length - 1}
        </Typography>
        {voteHistoryMarkup}
      </Paper>
    )
  }
}

Profile.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps)(withStyles(styles)(Profile))
