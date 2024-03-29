import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'

import PollTest from './PollTest'

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
    minWidth: 350,
    maxWidth: 600,
  },
})

class PollWrapper extends Component {
  render() {
    const {
      classes,
      data: { activeAlbums },
    } = this.props

    let pollTest = activeAlbums.map(album => (
      <div className={classes.onePoll} key={album.albumId}>
        <PollTest album={album} />
      </div>
    ))

    return <div className={classes.wrapper}>{pollTest}</div>
  }
}

PollWrapper.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps)(withStyles(styles)(PollWrapper))
