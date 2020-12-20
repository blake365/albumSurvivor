import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import Chip from '@material-ui/core/Chip'

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
  winnerDisplay: {
    margin: 7,
    padding: 0,
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
      tracks.length === 1 ? (
        <div style={{ display: 'flex', alignContent: 'center' }}>
          <Typography variant='body1'>
            {tracks[0].trackListing}. {tracks[0].name}:{' '}
          </Typography>
          <Chip
            label='WINNER'
            color='primary'
            className={classes.winnerDisplay}
          />
        </div>
      ) : (
        tracks.map(track => (
          <div
            key={track.trackId}
            style={{ display: 'flex', alignContent: 'center' }}
          >
            <Typography
              variant='body1'
              style={{ lineHeight: 1.7, width: '90%' }}
            >
              {track.trackListing}. {track.name}
            </Typography>
            <Typography
              variant='body1'
              style={{
                marginLeft: 'auto',
                lineHeight: 1.7,
              }}
            >
              {track.votes}
            </Typography>
          </div>
        ))
      )
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
          <div style={{ display: 'flex', alignContent: 'center' }}>
            <Typography
              variant='body1'
              style={{ fontWeight: 700, lineHeight: 1.7 }}
            >
              Total Votes:
            </Typography>{' '}
            <Typography
              variant='body1'
              style={{
                marginLeft: 'auto',
                lineHeight: 1.7,
                fontWeight: 700,
              }}
            >
              {totalVotes}
            </Typography>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(ArchivePost)
