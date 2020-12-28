import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import EditIcon from '@material-ui/icons/Edit'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MyButton from '../../util/MyButton'

import {
  uploadImage,
  deleteAlbum,
  getAlbum,
} from '../../redux/actions/dataActions'
import { CardMedia } from '@material-ui/core'

const styles = theme => ({
  ...theme.spreadThis,
  profileBody: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    margin: 8,
    width: 250,
  },
  image: {
    objectFit: 'cover',
    width: 'auto',
    height: '250px',
  },
  active: {
    color: 'green',
  },
  inactive: {
    color: 'red',
  },
  delete: {
    color: 'red',
    marginLeft: 'auto',
  },
})

class AlbumList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumId: null,
      open: false,
      loading: false,
    }
  }

  handleImageChange = event => {
    const image = event.target.files[0]
    // send to server
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadImage(this.state.albumId, formData)
  }

  handleEditPicture = event => {
    this.setState({
      albumId: event.currentTarget.value,
    })
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  handleClose = event => {
    this.setState({ open: false })
  }

  handleOpenDialog = event => {
    this.setState({
      open: true,
      albumId: event.currentTarget.value,
    })
  }

  handleAlbumDelete = event => {
    this.props.deleteAlbum(this.state.albumId)
    this.setState({
      open: false,
    })
  }

  setAlbumState = event => {
    event.preventDefault()
    console.log(event.currentTarget.value)
    this.props.getAlbum(event.currentTarget.value)
    const editLink = document.getElementById('editLink')
    setTimeout(function () {
      editLink.click()
    }, 500)
  }

  render() {
    const { classes, albums } = this.props

    let albumListMarkup = albums.map((album, index) => (
      <Card key={index} className={classes.card}>
        <CardMedia
          image={album.albumArt}
          className={classes.image}
          title='album art'
        />
        <CardContent>
          <input
            type='file'
            id='imageInput'
            hidden='hidden'
            onChange={this.handleImageChange}
          />
          <MyButton
            name='albumId'
            value={album.albumId}
            tip='Edit Album Art'
            onClick={this.handleEditPicture}
            btnClassName='button'
          >
            <EditIcon color='primary' value={album.albumId} />
            <small>Add Album Art</small>
          </MyButton>
          {album.activePoll ? (
            <Typography variant='body1' className={classes.active}>
              Active Poll
            </Typography>
          ) : (
            <Typography variant='body1' className={classes.inactive}>
              Inactive Poll
            </Typography>
          )}
          {album.showVotes ? (
            <Typography variant='body1' className={classes.active}>
              Show Votes
            </Typography>
          ) : (
            <Typography variant='body1' className={classes.inactive}>
              Don't Show Votes
            </Typography>
          )}
          <Typography variant='h5'>{album.albumName}</Typography>
          <Typography variant='body1'>{album.artist}</Typography>
          <Typography variant='body1'>{album.genre}</Typography>
          <Typography variant='body2'>{album.releaseYear}</Typography>
          <Typography variant='body2'>{album.numTracks} tracks</Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <Button
            // size='small'
            onClick={this.setAlbumState}
            value={album.albumId}
            color='primary'
            // component={Link}
            // to={`/albums/${album.albumId}`}
          >
            Edit Data
          </Button>
          <a href={`/albums/${album.albumId}`} id='editLink' hidden='hidden'>
            a
          </a>
          <Button
            size='small'
            value={album.albumId}
            className={classes.delete}
            onClick={this.handleOpenDialog}
          >
            <DeleteIcon />
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              Delete {album.albumName}?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Are you sure you want to delete {album.albumName} and all
                associated tracks and other data? The archive will not be
                affected.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                Cancel
              </Button>
              <Button
                onClick={this.handleAlbumDelete}
                color='default'
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    ))

    return <div className={classes.profileBody}>{albumListMarkup}</div>
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { uploadImage, deleteAlbum, getAlbum })(
  withStyles(styles)(AlbumList)
)
