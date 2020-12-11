import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import axios from 'axios'

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

  //FIXME: Put in loading spinner while tracks are fetched

  render() {
    const { classes, archive } = this.props

    const { tracks } = this.state

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='overline'>
            {new Date(archive.archiveCreatedAt._seconds * 1000).toDateString()}
            <Typography variant='h6' color='primary'>
              {archive.albumName}
            </Typography>
          </Typography>
          {tracks.map(track => (
            <div key={track.trackId}>
              <Typography variant='body1'>
                {track.name}: <strong>{track.votes}</strong> votes
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(ArchivePost)
