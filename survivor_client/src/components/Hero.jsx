import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  ...theme.spreadThis,
  heroBody: {
    padding: 20,
  },
})

class Hero extends Component {
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.heroBody}>
        <Typography variant='h4' color='primary'>
          Welcome to Album Survivor
        </Typography>
        <Typography variant='h6' color='inherit'>
          Vote for your <strong>least</strong> favorite song in the poll below.
          Each day the song with the most votes is eliminated until only the
          best song is left standing.
        </Typography>
      </Paper>
    )
  }
}

// Hero.propTypes = {
//   getTracks: PropTypes.func.isRequired,
//   postVote: PropTypes.func.isRequired,
//   data: PropTypes.object.isRequired,
// }

export default withStyles(styles)(Hero)
