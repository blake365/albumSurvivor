import React, { Component } from 'react'
// import axios from 'axios'
import { Grid } from '@material-ui/core'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SubmitTrack from '../components/admin/SubmitTrack'
import SubmitCommentary from '../components/admin/SubmitCommentary'
import SubmitAlbum from '../components/admin/SubmitAlbum'
import SubmitTrackToAlbum from '../components/admin/SubmitTrackToAlbum'
import AlbumList from '../components/admin/AlbumList'
import MessageSlot from '../components/MessageSlot'

import { getAlbums } from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.spreadThis,
})

class admin extends Component {
  componentDidMount() {
    this.props.getAlbums()
  }

  render() {
    const {
      user,
      data: { albums },
    } = this.props
    let adminMarkup =
      user.credentials.type !== 'admin' ? (
        <div>No No</div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MessageSlot page='admin' />
          </Grid>
          <Grid item sm={6} xs={12}>
            <SubmitCommentary />
            <AlbumList albums={albums} />
          </Grid>
          <Grid item sm={5} xs={12}>
            {/** <SubmitTrack /> **/}
            <SubmitAlbum />
            <br />
            <SubmitTrackToAlbum albums={albums} />
          </Grid>
        </Grid>
      )
    return <div>{adminMarkup}</div>
  }
}

admin.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
})

export default connect(mapStateToProps, { getAlbums })(
  withStyles(styles)(admin)
)
