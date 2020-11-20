import React, { Component } from 'react'
import { Container, Grid } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'

import Poll from '../components/Poll'
import Hero from '../components/Hero'
import Profile from '../components/Profile'
import MessageSlot from '../components/MessageSlot'

import PropTypes from 'prop-types'
import Graveyard from '../components/Graveyard'
import Commentary from '../components/Commentary'

const styles = theme => ({
  ...theme.spreadThis,
  spacer: {
    marginBottom: '10px',
  },
})

export class home extends Component {
  render() {
    const {
      classes,
      user: { authenticated },
    } = this.props

    let width
    authenticated ? (width = 6) : (width = 12)

    return (
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Hero />
          </Grid>
          <Grid item xs={12}>
            <MessageSlot />
          </Grid>
          <Grid item sm={width} xs={12}>
            <Poll />
            <Graveyard />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Commentary />
          </Grid>
          {authenticated && (
            <Grid item sm={3} xs={12}>
              <Profile />
            </Grid>
          )}
        </Grid>
      </Container>
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
