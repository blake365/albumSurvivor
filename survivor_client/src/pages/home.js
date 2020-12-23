import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import Hero from '../components/Hero'
// import MessageSlot from '../components/MessageSlot'
import SnackbarContainer from '../components/SnackbarContainer'

import PollWrapper from '../components/PollWrapper'
import Commentary from '../components/Commentary'

import {
  getFinalArchives,
  getArchives,
  getActiveAlbums,
} from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.spreadThis,
  spacer: {
    marginBottom: '10px',
  },
})

export class home extends Component {
  componentDidMount() {
    // this.props.getIP()
    this.props.getActiveAlbums()
    const start = {
      direction: 'older',
    }
    this.props.getArchives(start)
    this.props.getFinalArchives()
  }

  render() {
    return (
      <Grid container spacing={1}>
        <SnackbarContainer />
        <Grid item xs={12}>
          <Hero />
        </Grid>
        <Grid item xs={12}>
          <Commentary />
        </Grid>
        <Grid item sm={12} xs={12}>
          <PollWrapper />
        </Grid>
      </Grid>
    )
  }
}

export default connect(null, {
  getArchives,
  getFinalArchives,
  getActiveAlbums,
})(withStyles(styles)(home))
