import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getAlbum, postVote } from '../redux/actions/dataActions'

import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import PollOption from './PollOption'
import PollHeader from './PollHeader'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    width: 'auto',
    height: 60,
    margin: 5,
    fontSize: '1.2rem',
    alignSelf: 'center',
  },
  progressSpinner: {
    position: 'absolute',
  },
  pollBody: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
})

class PollTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: [],
      submitted: false,
      disabled: false,
      open: false,
      errors: {},
    }
  }

  componentDidMount() {
    let tracks = []
    fetch(
      `https://us-central1-albumsurvivor.cloudfunctions.net/api/albums/${this.props.album.albumId}/tracks`
    )
      .then(response => response.json())
      .then(data => {
        data.forEach(track => {
          tracks.push(track)
        })
      })
    console.log(tracks)
    this.setState({ tracks: tracks })
  }

  render() {
    const {
      classes,
      data: { loading },
      user: { authenticated },
      album,
    } = this.props

    const { tracks } = this.state

    let aliveTracks = tracks.filter(track => {
      if (track.alive) {
        return track
      }
    })

    let deadTracks = tracks.filter(track => {
      if (track.alive === false) {
        return track
      }
    })

    return (
      <div>
        {aliveTracks.map(track => (
          <div key={track.trackId}>
            <div>{track.name}</div>
          </div>
        ))}
        {deadTracks.map(track => (
          <div key={track.trackId}>
            <div style={{ color: 'green' }}>{track.name}</div>
            <div>{track.votes}</div>
          </div>
        ))}
      </div>
    )
  }
}

PollTest.propTypes = {
  getAlbum: PropTypes.func.isRequired,
  postVote: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps, { getAlbum, postVote })(
  withStyles(styles)(PollTest)
)
