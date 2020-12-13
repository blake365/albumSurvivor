import React, { Component } from 'react'
// import axios from 'axios'
import { Grid } from '@material-ui/core'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MessageSlot from '../components/MessageSlot'

import AlbumDetails from '../components/admin/AlbumDetails'
import { getAlbum } from '../redux/actions/dataActions'
import EditAlbum from '../components/admin/EditAlbum'

//get one album, use albumId in url. allow editing album details

const styles = theme => ({
  ...theme.spreadThis,
})

class albumPage extends Component {
  state = {
    albumId: '',
  }

  componentDidMount() {
    let path = this.props.location.pathname
    let halves = path.split('/')
    console.log(halves[2])
    this.props.getAlbum(halves[2])
  }

  render() {
    const {
      user,
      data: { album },
    } = this.props
    let albumPageMarkup =
      user.credentials.type !== 'admin' ? (
        <div>No No</div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MessageSlot page='admin' />
          </Grid>
          <Grid item sm={4} xs={12}>
            <AlbumDetails album={album} />
          </Grid>
          <Grid item sm={8} xs={12}>
            <EditAlbum album={album} />
          </Grid>
          <Grid item sm={12} xs={12}></Grid>
        </Grid>
      )
    return <div>{albumPageMarkup}</div>
  }
}

albumPage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
})

export default connect(mapStateToProps, { getAlbum })(
  withStyles(styles)(albumPage)
)
