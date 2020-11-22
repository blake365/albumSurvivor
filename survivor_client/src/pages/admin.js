import React, { Component } from 'react'
// import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'

import SubmitTrack from '../components/SubmitTrack'
import SubmitCommentary from '../components/SubmitCommentary'

const styles = theme => ({
  ...theme.spreadThis,
})

class admin extends Component {
  componentDidMount() {}

  render() {
    const { user } = this.props
    let adminMarkup =
      user.credentials.type !== 'admin' ? (
        <div>No No</div>
      ) : (
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            <SubmitCommentary />
          </Grid>
          <Grid item sm={4} xs={12}>
            <SubmitTrack />
          </Grid>
        </Grid>
      )
    return <div>{adminMarkup}</div>
  }
}

admin.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps)(withStyles(styles)(admin))
