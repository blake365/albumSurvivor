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

class AlbumList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumId: null,
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
          <Typography variant='h5'>{album.albumName}</Typography>
          <Typography variant='body1'>{album.artist}</Typography>
          <Typography variant='body1'>{album.genre}</Typography>
          <Typography variant='body2'>{album.releaseYear}</Typography>
          <Typography variant='body2'>{album.numTracks} tracks</Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            color='primary'
            component={Link}
            to={`/albums/${album.albumId}`}
          >
            Edit Data
          </Button>
        </CardActions>
      </Card>
    ))

    return <div className={classes.profileBody}>{albumListMarkup}</div>
  }
}

AlbumList.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { uploadImage })(
  withStyles(styles)(AlbumList)
)
