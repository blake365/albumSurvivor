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
import { postNewCommentary } from '../redux/actions/dataActions'

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
  formContainer: {
    height: '100%',
  },
})

class SubmitTrack extends Component {
  constructor() {
    super()
    this.state = {
      body: '',
      title: '',
      errors: {},
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const newCommentaryData = {
      body: this.state.body,
      title: this.state.title,
    }
    this.props.postNewCommentary(newCommentaryData)
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
      <Paper className={(classes.formContainer, classes.form)}>
        <Typography variant='h5' className={classes.pageTitle}>
          Add New Commentary
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            id='title'
            name='title'
            type='text'
            label='Title'
            className={classes.textField}
            helperText={errors.title}
            error={errors.title ? true : false}
            value={this.state.title}
            onChange={this.handleChange}
          />
          <TextField
            id='body'
            name='body'
            type='text'
            label='Body Text'
            className={classes.textField}
            helperText={errors.body}
            error={errors.body ? true : false}
            value={this.state.body}
            onChange={this.handleChange}
            multiline
            rows={3}
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

export default connect(mapStateToProps, { postNewCommentary })(
  withStyles(styles)(SubmitTrack)
)
