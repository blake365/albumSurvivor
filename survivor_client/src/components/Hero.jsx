import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'

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
          Welcome to Album Survivor
        </Typography>
        <Typography variant='h6' color='inherit'>
          Vote for your <strong>least</strong> favorite song in the poll below.
          Each day the song with the most votes is eliminated until only the
          best song is left standing.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to='/archive'
          style={{ marginRight: 10 }}
        >
          <strong>Archives</strong>
        </Button>
        <Button variant='contained' color='primary'>
          <strong>Blog</strong>
        </Button>
      </Paper>
    )
  }
}

export default withStyles(styles)(Hero)
