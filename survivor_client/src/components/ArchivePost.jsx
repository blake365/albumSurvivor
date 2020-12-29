import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import Alert from '@material-ui/lab/Alert'

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
    let mostVotes = Number.NEGATIVE_INFINITY
    let leastVotes = Number.POSITIVE_INFINITY
    var tmp

    function mostVotesCalc() {
      for (var i = tracks.length - 1; i >= 0; i--) {
        tmp = tracks[i].votes
        if (tmp < leastVotes) leastVotes = tmp
        if (tmp > mostVotes) mostVotes = tmp
      }
    }

    // function leastVotesCalc() {
    //   tracks.forEach(track => {
    //     totalVotes += track.votes
    //     return totalVotes
    //   })
    // }

    function totalVotesCalc() {
      tracks.forEach(track => {
        totalVotes += track.votes
        return totalVotes
      })
    }
    totalVotesCalc()
    mostVotesCalc()

    let markup = !loading ? (
      tracks.map(track => (
        <div
          key={track.trackId}
          style={{
            display: 'flex',
            alignContent: 'center',
          }}
        >
          <Typography variant='body1' style={{ lineHeight: 1.7, width: '90%' }}>
            {track.trackListing}.{' '}
            <span
              style={
                track.votes === mostVotes
                  ? { color: 'red' }
                  : track.votes === leastVotes
                  ? { color: '#4caf50' }
                  : null
              }
            >
              {track.name}
            </span>
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
          {tracks.length === 2 && (
            <Alert
              severity='warning'
              variant='filled'
              icon={false}
              style={{
                fontSize: '0.9rem',
                padding: '4px 8px',
                height: 20,
                width: 'fit-content',
                alignItems: 'center',
              }}
            >
              Final Round
            </Alert>
          )}
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
