import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  ...theme.spreadThis,
  profileBody: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    marginBottom: 8,
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
})

class ArchivePost extends Component {
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
          `https://us-central1-albumsurvivor.cloudfunctions.net/api/archives/${this.props.archive.archiveId}`
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
    const { classes, archive } = this.props

    const { tracks, loading } = this.state

    let markup = !loading ? (
      tracks.map(track => (
        <div key={track.trackId}>
          <Typography variant='body1'>
            {track.trackListing}. {track.name}: <strong>{track.votes}</strong>{' '}
            votes
          </Typography>
        </div>
      ))
    ) : (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={20} thickness={2} />
      </div>
    )

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='overline'>
            {new Date(archive.archiveCreatedAt._seconds * 1000).toDateString()}
            <Typography variant='h6' color='primary'>
              {archive.albumName}
            </Typography>
          </Typography>
          {markup}
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(ArchivePost)
