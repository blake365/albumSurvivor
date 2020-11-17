import React, { Component } from 'react'
// import axios from 'axios'

import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { postNewTrack } from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.spreadThis,
})

class admin extends Component {
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
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
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
              fullWidth
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
              fullWidth
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
              fullWidth
            />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
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
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

admin.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps, { postNewTrack })(
  withStyles(styles)(admin)
)
