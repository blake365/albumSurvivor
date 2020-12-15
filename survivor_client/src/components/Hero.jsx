import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...theme.spreadThis,
  heroBody: {
    padding: '5px 15px 5px 15px',
    background: 'inherit',
  },
})

class Hero extends Component {
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.heroBody} elevation={0}>
        <Typography variant='h4' color='primary'>
          Welcome to Album Survivor!
        </Typography>
        <Typography variant='h6' color='inherit'>
          Vote for your <strong>least</strong> favorite song in the polls below.
          Each day the songs with the most votes is eliminated until only the
          best song is left standing. You may vote one time per day and the day
          will reset at <strong>7PM EST</strong>. Make an account to save your
          vote history and pay respects to eliminated songs.
        </Typography>
        {/** <Button variant='contained' color='primary'>
          <strong>Blog</strong>
        </Button> **/}
      </Paper>
    )
  }
}

export default withStyles(styles)(Hero)
