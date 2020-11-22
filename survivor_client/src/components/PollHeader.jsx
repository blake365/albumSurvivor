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
  },
  content: {
    // display: 'inline-block',
    margin: '2px 4px 2px 4px',
  },
})

class PollHeader extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.card} elevation={0}>
        <div className={classes.coverContainer}>
          <img
            alt='album cover'
            className={classes.cover}
            src='https://www.covermesongs.com/wp-content/uploads/2020/04/Royal_Scam.jpg'
            title='The Royal Scam'
          />
        </div>
        <div>
          <Typography variant='h5' className={classes.content}>
            In Rainbows
          </Typography>
          <Typography variant='body1' className={classes.content}>
            by
          </Typography>
          <Typography variant='h5' className={classes.content}>
            Radiohead
          </Typography>
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
