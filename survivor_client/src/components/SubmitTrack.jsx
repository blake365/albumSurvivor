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
import { postNewTrack } from '../redux/actions/dataActions'

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

class SubmitTrack extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      trackListing: '',
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
      description: this.state.description,
      trackListing: this.state.trackListing,
    }
    this.props.postNewTrack(newTrackData)
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
    } = this.props
    const { errors } = this.state

    return (
      <Paper className={classes.form}>
        <Typography variant='h5' className={classes.pageTitle}>
          Add A New Song
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            id='name'
            name='name'
            type='text'
            label='name'
            className={classes.textField}
            helperText={errors.name}
            error={errors.name ? true : false}
            value={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            id='description'
            name='description'
            type='text'
            label='description'
            className={classes.textField}
            helperText={errors.description}
            error={errors.description ? true : false}
            value={this.state.description}
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

SubmitTrack.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { postNewTrack })(
  withStyles(styles)(SubmitTrack)
)
