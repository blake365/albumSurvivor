import React, { Component } from 'react'
// import axios from 'axios'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { editAlbumData } from '../../redux/actions/dataActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

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

class EditAlbum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumName: '',
      artist: '',
      genre: '',
      numTracks: '',
      releaseYear: '',
      spotify: '',
      activePoll: false,
      errors: {},
      showVotes: true,
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      loading: true,
    })
    const editedAlbumData = {
      albumName: this.state.albumName,
      artist: this.state.artist,
      genre: this.state.genre,
      numTracks: this.state.numTracks,
      releaseYear: this.state.releaseYear,
      activePoll: this.state.activePoll,
      spotifyURI: this.state.spotify,
      showVotes: this.state.showVotes,
    }
    this.props.editAlbumData(this.props.album.data.albumId, editedAlbumData)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSwitchChange = event => {
    this.setState({
      [event.target.name]: event.target.checked,
    })
  }

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props
    const { errors } = this.state

    return (
      <Paper className={classes.form}>
        <Typography variant='h5' className={classes.pageTitle}>
          Edit Album Details
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            id='albumName'
            name='albumName'
            type='text'
            label='Album Name'
            className={classes.textField}
            helperText={errors.albumName}
            error={errors.albumName ? true : false}
            value={this.state.albumName}
            onChange={this.handleChange}
          />
          <TextField
            id='artist'
            name='artist'
            type='text'
            label='Artist'
            className={classes.textField}
            helperText={errors.artist}
            error={errors.artist ? true : false}
            value={this.state.artist}
            onChange={this.handleChange}
          />
          <TextField
            id='genre'
            name='genre'
            type='text'
            label='Genre'
            className={classes.textField}
            helperText={errors.genre}
            error={errors.genre ? true : false}
            value={this.state.genre}
            onChange={this.handleChange}
          />
          <TextField
            id='spotify'
            name='spotify'
            type='text'
            label='Spotify URI'
            className={classes.textField}
            helperText={errors.spotify}
            error={errors.spotify ? true : false}
            value={this.state.spotify}
            onChange={this.handleChange}
          />
          <TextField
            id='numTracks'
            name='numTracks'
            type='number'
            label='Number of Tracks'
            className={classes.textField}
            helperText={errors.numTracks}
            error={errors.numTracks ? true : false}
            value={this.state.numTracks}
            onChange={this.handleChange}
          />
          <TextField
            id='releaseYear'
            name='releaseYear'
            type='number'
            label='Release Year'
            className={classes.textField}
            helperText={errors.releaseYear}
            error={errors.releaseYear ? true : false}
            value={this.state.releaseYear}
            onChange={this.handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                color='primary'
                checked={this.state.activePoll}
                onChange={this.handleSwitchChange}
                name='activePoll'
              />
            }
            label='Make this album an active poll?'
          />
          <br />
          <FormControlLabel
            control={
              <Switch
                color='primary'
                checked={this.state.showVotes}
                onChange={this.handleSwitchChange}
                name='showVotes'
              />
            }
            label='Show votes after a vote is cast?'
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

EditAlbum.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { editAlbumData })(
  withStyles(styles)(EditAlbum)
)
