import React, { Component } from 'react'
import { Grid } from '@material-ui/core'

import { connect } from 'react-redux'

import Poll from '../components/Poll'
import Hero from '../components/Hero'
import Profile from '../components/Profile'

import PropTypes from 'prop-types'

export class home extends Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Hero />
        </Grid>
        <Grid item sm={8} xs={12}>
          <Poll />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps)(home)
