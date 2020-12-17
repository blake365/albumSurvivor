import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'

// import { connect } from 'react-redux'

const styles = theme => ({
  ...theme.spreadThis,
  card: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 260,
  },
  cover: {
    margin: 4,
    borderRadius: '1%',
    maxWidth: 250,
    width: '100%',
    height: 'auto',
    border: '1px solid black',
  },
  coverContainer: {
    marginRight: 10,
    minWidth: '50%',
    width: '50%',
  },
  content: {
    // display: 'inline-block',
    margin: '2px 4px 2px 4px',
  },
  header: {
    width: '100%',
    textAlign: 'center',
  },
})

class PollHeader extends Component {
  render() {
    const {
      classes,
      tracks,
      album: { albumName, artist, albumArt, numTracks },
    } = this.props

    let firstRoundMarkup = tracks.length === numTracks && (
      <Alert
        elevation={1}
        icon={false}
        severity='info'
        variant='filled'
        style={{
          fontSize: '1.3rem',
          padding: '0px 10px 0px 10px',
          justifyContent: 'center',
        }}
      >
        Welcome to the first round!
      </Alert>
    )

    let finalRoundMarkup = tracks.length === 2 && (
      <Alert
        elevation={1}
        icon={false}
        severity='warning'
        variant='filled'
        style={{
          fontSize: '1.3rem',
          padding: '0px 10px 0px 10px',
          justifyContent: 'center',
        }}
      >
        Final Round!
      </Alert>
    )

    let winnerMarkup = tracks.length === 1 && (
      <Alert
        elevation={1}
        icon={false}
        severity='success'
        variant='filled'
        style={{
          fontSize: '1.3rem',
          padding: '0px 10px 0px 10px',
          justifyContent: 'center',
        }}
      >
        {tracks[0].name} is the Winner!
      </Alert>
    )

    return (
      <div>
        <div className={classes.header}>
          {firstRoundMarkup}
          {finalRoundMarkup}
          {winnerMarkup}
        </div>
        <div className={classes.card} elevation={0}>
          <div className={classes.coverContainer}>
            <img
              alt='album cover'
              className={classes.cover}
              src={albumArt}
              title={albumName}
            />
          </div>
          <div>
            <Typography variant='h5' className={classes.content}>
              {albumName}
            </Typography>
            <Typography variant='body1' className={classes.content}>
              by
            </Typography>
            <Typography variant='h5' className={classes.content}>
              {artist}
            </Typography>
          </div>
        </div>
      </div>
    )
  }
}

PollHeader.propTypes = {
  classes: PropTypes.object.isRequired,
}

// const mapStateToProps = state => ({
//   user: state.user,
// })

export default withStyles(styles)(PollHeader)
