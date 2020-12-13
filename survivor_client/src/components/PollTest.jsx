import React, { Component } from 'react'
import PollNew from './PollNew'
import axios from 'axios'
import GraveyardNew from './GraveyardNew'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  ...theme.spreadThis,
  onePoll: {
    flex: 1,
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
      loading: false,
      tracks: [],
    }
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios
        .get(
          `https://us-central1-albumsurvivor.cloudfunctions.net/api/albums/${this.props.album.albumId}/tracks`
        )
        .then(result =>
          this.setState({
            loading: false,
            tracks: [...result.data],
          })
        )
    })
  }

  render() {
    const { album, classes } = this.props

    const { tracks, loading } = this.state

    let aliveTracks = tracks.filter(track => track.alive === true)

    let deadTracks = tracks.filter(track => track.alive === false)

    let markup = !loading ? (
      <div className={classes.onePoll}>
        <PollNew tracks={aliveTracks} album={album} />
        <GraveyardNew
          deadTracks={deadTracks}
          aliveTracks={aliveTracks}
          album={album}
        />
      </div>
    ) : (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    )

    return markup
  }
}

export default withStyles(styles)(PollTest)
