import React, { Component } from 'react'
import PollNew from './PollNew'
import axios from 'axios'
import GraveyardNew from './GraveyardNew'
import { Grid } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  ...theme.spreadThis,
  onePoll: {
    flex: 1,
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

    return (
      <div className={classes.onePoll}>
        <PollNew tracks={aliveTracks} album={album} />
        <GraveyardNew
          deadTracks={deadTracks}
          aliveTracks={aliveTracks}
          album={album}
        />
      </div>
    )
  }
}

export default withStyles(styles)(PollTest)
