import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'

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
  },
  content: {
    // display: 'inline-block',
    margin: '2px 4px 2px 4px',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
})

class PollHeader extends Component {
  render() {
    const { classes, tracks, albumName, artist, albumArt } = this.props

    let finalRoundMarkup = tracks.length === 2 && (
      <Typography variant='h3'>Final Round!</Typography>
    )

    let winnerMarkup = tracks.length === 1 && (
      <Typography variant='h3'>{tracks[0].name} is the Winner!</Typography>
    )

    return (
      <div>
        <div className={classes.header}>
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
