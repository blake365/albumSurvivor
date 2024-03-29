import React, { Component } from 'react'
// import axios from 'axios'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { connect } from 'react-redux'
import { postNewTrackToAlbum } from '../../redux/actions/dataActions'

const styles = theme => ({
  ...theme.spreadThis,
  pageTitle: {
    padding: '10px',
  },
  textField: {
    width: '80%',
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    height: 46,
    width: 78,
    position: 'relative',
  },
})

class SubmitTrackToAlbum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      // description: '',
      trackListing: '',
      // length: '',
      // lyrics: '',
      albumId: '',
      errors: {},
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      loading: true,
    })
    const newTrackData = {
      name: this.state.name,
      // description: this.state.description,
      trackListing: this.state.trackListing,
      // length: this.state.length,
      // lyrics: this.state.lyrics,
    }
    this.props.postNewTrackToAlbum(this.state.albumId, newTrackData)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const {
      classes,
      UI: { loading },
      albums,
    } = this.props
    const { errors } = this.state

    return (
      <Paper className={classes.form}>
        <Typography variant='h5' className={classes.pageTitle}>
          Add A New Song To An Album
        </Typography>
        <Typography variant='subtitle1'>* = required</Typography>

        <form noValidate onSubmit={this.handleSubmit}>
          <div className={classes.textField}>
            <InputLabel id='demo-simple-select-label'>
              Select Album *
            </InputLabel>
            <Select
              style={{ minWidth: 200 }}
              labelId='select album'
              name='albumId'
              id='albumId'
              value={this.state.albumId}
              onChange={this.handleChange}
            >
              {albums.map(album => (
                <MenuItem key={album.albumId} value={album.albumId}>
                  {album.albumName}
                </MenuItem>
              ))}
            </Select>
          </div>
          <TextField
            id='name'
            name='name'
            type='text'
            label='Name *'
            className={classes.textField}
            helperText={errors.name}
            error={errors.name ? true : false}
            value={this.state.name}
            onChange={this.handleChange}
          />

          <TextField
            id='trackListing'
            name='trackListing'
            type='number'
            label='Track List Number *'
            className={classes.textField}
            helperText={errors.trackListing}
            error={errors.trackListing ? true : false}
            value={this.state.trackListing}
            onChange={this.handleChange}
          />
          {errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            label='Submit'
            className={classes.button}
          >
            {loading ? (
              <CircularProgress className={classes.progress} size={30} />
            ) : (
              'Submit'
            )}
          </Button>
          <br />
        </form>
      </Paper>
    )
  }
}

SubmitTrackToAlbum.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { postNewTrackToAlbum })(
  withStyles(styles)(SubmitTrackToAlbum)
)
