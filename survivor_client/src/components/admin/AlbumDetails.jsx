import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MyButton from '../../util/MyButton'

import { uploadImage, deleteTrack } from '../../redux/actions/dataActions'
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
    width: 300,
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

class AlbumDetails extends Component {
  state = {
    trackId: null,
    open: false,
  }

  handleImageChange = event => {
    const image = event.target.files[0]
    // send to server
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadImage(this.props.album.data.albumId, formData)
  }

  handleEditPicture = event => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  handleClose = event => {
    this.setState({ open: false })
  }

  handleOpenDialog = event => {
    this.setState({
      open: true,
      trackId: event.currentTarget.value,
    })
  }

  handleDeleteTrack = event => {
    this.props.deleteTrack(this.props.album.data.albumId, this.state.trackId)
    this.setState({ open: false })
  }

  render() {
    const {
      classes,
      album: { data, tracks },
    } = this.props

    return (
      <div className={classes.profileBody}>
        <Card className={classes.card}>
          <CardMedia
            image={data.albumArt}
            className={classes.image}
            alt='album art'
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
              value={data.albumId}
              tip='Edit Album Art'
              onClick={this.handleEditPicture}
              btnClassName='button'
            >
              <EditIcon color='primary' value={data.albumId} />
              <small>Add Album Art</small>
            </MyButton>
            {data.activePoll ? (
              <Typography variant='body1' className={classes.active}>
                Active Poll
              </Typography>
            ) : (
              <Typography variant='body1' className={classes.inactive}>
                Inactive Poll
              </Typography>
            )}
            {data.showVotes ? (
              <Typography variant='body1' className={classes.active}>
                Show Votes
              </Typography>
            ) : (
              <Typography variant='body1' className={classes.inactive}>
                Don't Show Votes
              </Typography>
            )}
            <Typography variant='h5'>{data.albumName}</Typography>
            <Typography variant='body1'>{data.artist}</Typography>
            <Typography variant='body1'>{data.genre}</Typography>
            <Typography variant='body2'>{data.releaseYear}</Typography>
            <Typography variant='body2'>{data.numTracks} tracks</Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h6'>Tracks:</Typography>
            {tracks.map((track, index) => (
              <div style={{ display: 'flex' }} key={index}>
                <Typography
                  variant='body1'
                  style={
                    track.alive
                      ? { color: 'green' }
                      : { textDecoration: 'line-through' }
                  }
                >
                  {track.trackListing}: {track.name}
                </Typography>
                <Button
                  value={track.trackId}
                  size='small'
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
                    Delete this song?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      Are you sure you want to delete this song and all
                      associated data? The archive will not be affected.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color='primary'>
                      Cancel
                    </Button>
                    <Button
                      onClick={this.handleDeleteTrack}
                      color='default'
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { uploadImage, deleteTrack })(
  withStyles(styles)(AlbumDetails)
)
