import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import CardMedia from '@material-ui/core/CardMedia'

// import { connect } from 'react-redux'

const styles = theme => ({
  ...theme.spreadThis,
  card: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cover: {
    margin: 4,
    borderRadius: '1%',
    width: 250,
    height: 250,
    border: '1px solid black',
  },
  content: {
    display: 'inline-block',
    margin: '2px 4px 2px 4px',
  },
})

class PollHeader extends Component {
  render() {
    const { classes, tracks } = this.props

    return (
      <div className={classes.card} elevation={0}>
        <img
          className={classes.cover}
          src='https://www.covermesongs.com/wp-content/uploads/2020/04/Royal_Scam.jpg'
          title='The Royal Scam'
        />
        <div>
          <Typography variant='h5' className={classes.content}>
            The Royal Scam
          </Typography>
          <Typography variant='body1' className={classes.content}>
            by
          </Typography>
          <Typography variant='h5' className={classes.content}>
            Steely Dan
          </Typography>
        </div>
      </div>
    )
  }
}

PollHeader.propTypes = {
  track: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

// const mapStateToProps = state => ({
//   user: state.user,
// })

export default withStyles(styles)(PollHeader)
