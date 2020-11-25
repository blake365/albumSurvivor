import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import EditIcon from '@material-ui/icons/Edit'

import MyButton from '../../util/MyButton'

import { getAlbums, uploadImage } from '../../redux/actions/dataActions'
import { CardMedia } from '@material-ui/core'

const styles = theme => ({
  ...theme.spreadThis,
  profileBody: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    margin: 8,
  },
  image: {
    width: 'auto',
    height: 150,
  },
})

class AlbumList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumId: null,
    }
  }

  componentDidMount() {
    this.props.getAlbums()
  }

  handleImageChange = event => {
    const image = event.target.files[0]
    // send to server
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadImage(this.state.albumId, formData)
  }

  handleMouseOver = event => {}

  handleEditPicture = event => {
    this.setState({
      albumId: event.currentTarget.value,
    })
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  render() {
    const {
      classes,
      data: { albums },
    } = this.props

    let albumListMarkup = albums.map((album, index) => (
      <Card
        key={index}
        className={classes.card}
        onMouseEnter={this.handleMouseOver}
        value={index}
      >
        <CardContent>
          <CardMedia
            image={album.albumArt}
            className={classes.image}
            title='album art'
          />
          <input
            type='file'
            id='imageInput'
            hidden='hidden'
            onChange={this.handleImageChange}
          />
          <div>
            Add/Edit Album Art
            <MyButton
              name='albumId'
              value={album.albumId}
              tip='Edit Album Art'
              onClick={this.handleEditPicture}
              btnClassName='button'
            >
              {' '}
              <EditIcon color='primary' value={album.albumId} />
            </MyButton>
          </div>
          <Typography variant='h5'>{album.albumName}</Typography>
          <Typography variant='subtitle2'>{album.artist}</Typography>
          <Typography variant='body1'>{album.genre}</Typography>
        </CardContent>
      </Card>
    ))

    return <div className={classes.profileBody}>{albumListMarkup}</div>
  }
}

AlbumList.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI,
})

export default connect(mapStateToProps, { getAlbums, uploadImage })(
  withStyles(styles)(AlbumList)
)
