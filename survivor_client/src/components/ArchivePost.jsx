import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import NewReleasesIcon from '@material-ui/icons/NewReleases'

const styles = theme => ({
  ...theme.spreadThis,
  card: {
    marginBottom: 8,
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  headline: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    flexGrow: 1,
  },
  newIcon: {
    display: 'flex',
    alignItems: 'center',
    color: 'limegreen',
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

    let totalVotes = 0
    function totalVotesCalc() {
      tracks.forEach(track => {
        totalVotes += track.votes
        return totalVotes
      })
    }
    totalVotesCalc()

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
          <div className={classes.headline}>
            <Typography variant='overline' className={classes.title}>
              {new Date(archive.archiveCreatedAt).toDateString()}
            </Typography>
            {new Date(archive.archiveCreatedAt).toDateString() ===
              new Date().toDateString() ||
            new Date(archive.archiveCreatedAt).getDate() ===
              new Date().getDate() - 1 ? (
              <span className={classes.newIcon}>
                <NewReleasesIcon />
                NEW
              </span>
            ) : null}
          </div>
          <Typography variant='h6' color='primary'>
            {archive.albumName}
          </Typography>
          {markup}
          <Typography>Total Votes: {totalVotes}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(ArchivePost)
