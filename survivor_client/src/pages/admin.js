import React, { Component } from 'react'
// import axios from 'axios'
import { Grid } from '@material-ui/core'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import SubmitAlbum from '../components/admin/SubmitAlbum'
import SubmitTrackToAlbum from '../components/admin/SubmitTrackToAlbum'
import AlbumList from '../components/admin/AlbumList'
// import MessageSlot from '../components/MessageSlot'

import { getAlbums } from '../redux/actions/dataActions'
import SnackbarContainer from '../components/SnackbarContainer'

const styles = theme => ({
  ...theme.spreadThis,
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
})

// TODO: add loading icon so cold starts don't fail to load data into the state ... seems to be solved

class admin extends Component {
  componentDidMount() {
    this.props.getAlbums()
  }

  render() {
    const {
      classes,
      user,
      data: { albums, loading },
    } = this.props
    let adminMarkup =
      user.credentials.type !== 'admin' ? (
        <div>No No</div>
      ) : loading ? (
        <div className={classes.spinnerDiv}>
          <CircularProgress size={200} thickness={2} />
        </div>
      ) : (
        <Grid container spacing={2}>
          <SnackbarContainer />
          <Grid item sm={6} xs={12}>
            <AlbumList albums={albums} />
          </Grid>
          <Grid item sm={5} xs={12}>
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
