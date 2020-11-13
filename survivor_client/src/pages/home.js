import React, { Component } from 'react'
import { Grid } from '@material-ui/core'

import { connect } from 'react-redux'
import { getTracks } from '../redux/actions/dataActions'

import Poll from '../components/Poll'

import PropTypes from 'prop-types'

export class home extends Component {
  // componentDidMount() {
  //   this.props.getTracks()
  // }

  render() {
    // const { tracks, loading } = this.props.data

    // let tracksMarkup = !loading ? (
    //   tracks.map(track => (
    //     <p key={track.trackId}>
    //       {track.trackListing} - {track.name}: {track.description}...{' '}
    //       {track.votes} votes
    //     </p>
    //   ))
    // ) : (
    //   <p> loading... </p>
    // )

    return (
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12}>
          <p>Poll here...</p>
          <Poll />
        </Grid>
        <Grid item>
          <p>Profile... vote history</p>
        </Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  getTracks: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getTracks })(home)
