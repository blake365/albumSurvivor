import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'

import Poll from '../components/Poll'
import Hero from '../components/Hero'
import MessageSlot from '../components/MessageSlot'

import PropTypes from 'prop-types'
import Graveyard from '../components/Graveyard'
import Commentary from '../components/Commentary'
import PollWrapper from '../components/PollWrapper'

const styles = theme => ({
  ...theme.spreadThis,
  spacer: {
    marginBottom: '10px',
  },
})

export class home extends Component {
  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Hero />
        </Grid>
        <Grid item xs={12}>
          <MessageSlot />
        </Grid>

        <Grid item sm={12} xs={12}>
          <PollWrapper />
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(home))
