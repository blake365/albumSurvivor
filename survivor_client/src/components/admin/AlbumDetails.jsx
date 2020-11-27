import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import EditIcon from '@material-ui/icons/Edit'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import MyButton from '../../util/MyButton'

import { uploadImage } from '../../redux/actions/dataActions'
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
})

class AlbumDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumId: this.props.albumId,
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
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
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
            <Typography variant='h5'>{data.albumName}</Typography>
            <Typography variant='body1'>{data.artist}</Typography>
            <Typography variant='body1'>{data.genre}</Typography>
            <Typography variant='body2'>{data.releaseYear}</Typography>
            <Typography variant='body2'>{data.numTracks} tracks</Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            {/**TODO: add other fields to track list display */}
            <div>Tracks:</div>
            {tracks.map((track, index) => (
              <Typography variant='body1' key={index}>
                {track.trackListing}: {track.name}{' '}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }
}

AlbumDetails.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { uploadImage })(
  withStyles(styles)(AlbumDetails)
)
