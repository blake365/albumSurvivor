import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...theme.spreadThis,
  heroBody: {
    padding: 20,
    background: 'inherit',
  },
})

class Hero extends Component {
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.heroBody} elevation={0}>
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

export default withStyles(styles)(Hero)
