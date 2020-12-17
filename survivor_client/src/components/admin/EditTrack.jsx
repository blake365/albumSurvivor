import React, { Component } from 'react'
// import axios from 'axios'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { editTrackData } from '../../redux/actions/dataActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const styles = theme => ({
  ...theme.spreadThis,
  container: {
    marginTop: 20,
  },
  pageTitle: {
    padding: '10px',
    textAlign: 'center',
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

class EditTrack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trackId: '',
      name: '',
      description: '',
      trackListing: '',
      length: '',
      lyrics: '',
      albumId: '',
      alive: true,
      errors: {},
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      loading: true,
    })

    const editedTrackData = {
      name: this.state.name,
      description: this.state.description,
      trackListing: this.state.trackListing,
      length: this.state.length,
      lyrics: this.state.lyrics,
      alive: this.state.alive,
    }

    if (this.state.trackId === '') {
      return
    } else {
      this.props.editTrackData(
        this.props.album.data.albumId,
        this.state.trackId,
        editedTrackData
      )
    }
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
      album: { tracks },
    } = this.props
    const { errors } = this.state

    return (
      <Paper className={classes.container}>
        <Typography variant='h5' className={classes.pageTitle}>
          Edit Song Details
        </Typography>
        <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
          <div className={classes.textField}>
            <InputLabel id='demo-simple-select-label'>
              Select Song To Edit
            </InputLabel>
            <Select
              placeholder='Select Song'
              style={{ minWidth: 200 }}
              labelId='select song'
              name='trackId'
              id='trackId'
              value={this.state.trackId}
              onChange={this.handleChange}
            >
              {tracks.map(track => (
                <MenuItem value={track.trackId}>{track.name}</MenuItem>
              ))}
            </Select>
          </div>
          <TextField
            id='name'
            name='name'
            type='text'
            label='Name'
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
            label='Track List Number'
            className={classes.textField}
            helperText={errors.trackListing}
            error={errors.trackListing ? true : false}
            value={this.state.trackListing}
            onChange={this.handleChange}
          />
          <TextField
            id='description'
            name='description'
            type='text'
            label='Description'
            className={classes.textField}
            helperText={errors.description}
            error={errors.description ? true : false}
            value={this.state.description}
            onChange={this.handleChange}
          />
          <TextField
            id='lyrics'
            name='lyrics'
            type='text'
            label='Lyrics'
            className={classes.textField}
            helperText={errors.lyrics}
            error={errors.lyrics ? true : false}
            value={this.state.lyrics}
            onChange={this.handleChange}
          />
          <TextField
            id='length'
            name='length'
            type='text'
            label='Length'
            className={classes.textField}
            helperText={errors.length}
            error={errors.length ? true : false}
            value={this.state.length}
            onChange={this.handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                color='primary'
                checked={this.state.alive}
                onChange={this.handleSwitchChange}
                name='alive'
              />
            }
            label='Is This Song Alive?'
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

EditTrack.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { editTrackData })(
  withStyles(styles)(EditTrack)
)
