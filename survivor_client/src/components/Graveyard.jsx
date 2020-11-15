import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { getGraveyardTracks } from '../redux/actions/dataActions'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...theme.spreadThis,
  graveyardBody: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

class Graveyard extends Component {
  componentDidMount() {
    this.props.getGraveyardTracks()
  }

  render() {
    const {
      classes,
      UI: loading,
      data: { deadTracks },
    } = this.props

    let graveyardMarkup = deadTracks.map((track, index) => (
      <Typography variant='h6' key={index}>
        {track.name}
      </Typography>
    ))

    return (
      <Paper className={classes.graveyardBody}>
        <Typography variant='h5'>Eliminated Songs: </Typography>
        <Typography variant='body1'></Typography>
        {graveyardMarkup}
      </Paper>
    )
  }
}

Graveyard.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI,
})

export default connect(mapStateToProps, { getGraveyardTracks })(
  withStyles(styles)(Graveyard)
)
