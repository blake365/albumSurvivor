import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import green from '@material-ui/core/colors/green'

// import { connect } from 'react-redux'

const styles = theme => ({
  ...theme.spreadThis,
  card: {
    display: 'flex',
    margin: '8px 4px 8px 4px',

    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 260,
  },
  cover: {
    borderRadius: '1%',
    maxWidth: 250,
    width: '100%',
    height: 'auto',
    border: '1px solid black',
  },
  coverContainer: {
    position: 'relative',
    // marginRight: 10,
    margin: 'auto',
    width: '50%',
  },
  titleAndArtist: {
    width: '50%',
    paddingLeft: 8,
  },
  content: {
    // display: 'inline-block',
    margin: '2px 4px 2px 4px',
  },
  header: {
    margin: 4,
    textAlign: 'center',
  },
  spotify: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    bottom: '3%',
    left: '2%',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  },
})

class PollHeader extends Component {
  render() {
    const {
      classes,
      tracks,
      album: { albumName, artist, albumArt, numTracks, spotifyURI },
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
        First Round!
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
            {spotifyURI ? (
              <Tooltip title='Open in Spotify' placement='top'>
                <IconButton
                  className={classes.spotify}
                  href={`https://open.spotify.com/album/${spotifyURI}`}
                  target='_blank'
                >
                  <MusicNoteIcon style={{ color: green.A400 }} />
                </IconButton>
              </Tooltip>
            ) : null}
          </div>
          <div className={classes.titleAndArtist}>
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
