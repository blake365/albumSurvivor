import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getActiveAlbums } from '../redux/actions/dataActions'

import AlbumList from './admin/AlbumList'

const styles = theme => ({
  ...theme.spreadThis,
})

class PollWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.getActiveAlbums()
  }

  render() {
    const {
      classes,
      data: { activeAlbums, loading },
      user: { authenticated },
    } = this.props

    return <AlbumList albums={activeAlbums} />
  }
}

PollWrapper.propTypes = {
  getActiveAlbums: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps, { getActiveAlbums })(
  withStyles(styles)(PollWrapper)
)
