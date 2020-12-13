import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

import ArchiveWrapper from '../components/ArchiveWrapper'

const styles = theme => ({
  ...theme.spreadThis,
  spacer: {
    marginBottom: '10px',
  },
  hero: {
    padding: 10,
  },
})

export class archive extends Component {
  render() {
    const { classes } = this.props

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h3' className={classes.hero}>
            Archive of Votes
          </Typography>
        </Grid>
        <Grid item sm={12} xs={12}>
          <ArchiveWrapper />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(archive)
