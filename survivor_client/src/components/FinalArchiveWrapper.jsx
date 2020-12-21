import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import FinalArchivePost from './FinalArchivePost'
import Typography from '@material-ui/core/Typography'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
  ...theme.spreadThis,
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  onePoll: {
    margin: '0px 5px 10px 5px',
    flex: 1,
    minWidth: 300,
    maxWidth: 600,
  },
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

class FinalArchiveWrapper extends Component {
  render() {
    const {
      classes,
      data: { finalArchives },
    } = this.props

    let archiveMarkup = finalArchives.map(archive => (
      <div className={classes.onePoll} key={archive.finalArchiveId}>
        <div className={classes.card} elevation={0}>
          <div className={classes.coverContainer}>
            <img
              alt='album cover'
              className={classes.cover}
              src={archive.albumArt}
              title={archive.albumName}
            />
            {archive.spotifyURI ? (
              <Tooltip title='Open in Spotify' placement='top'>
                <IconButton
                  className={classes.spotify}
                  href={`https://open.spotify.com/album/${archive.spotifyURI}`}
                  target='_blank'
                >
                  <MusicNoteIcon style={{ color: green.A400 }} />
                </IconButton>
              </Tooltip>
            ) : null}
          </div>
          <div className={classes.titleAndArtist}>
            <Typography variant='h5' className={classes.content}>
              {archive.albumName}
            </Typography>
            <Typography variant='body1' className={classes.content}>
              by
            </Typography>
            <Typography variant='h5' className={classes.content}>
              {archive.artist}
            </Typography>
          </div>
        </div>
        <FinalArchivePost archive={archive} />
      </div>
    ))

    return (
      <div>
        <div className={classes.wrapper}>{archiveMarkup}</div>
      </div>
    )
  }
}

FinalArchiveWrapper.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps)(withStyles(styles)(FinalArchiveWrapper))
