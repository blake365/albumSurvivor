import React, { Component } from 'react'
// import axios from 'axios'

import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

//redux
import { connect } from 'react-redux'
import { loginUser, loginGoogleUser } from '../redux/actions/userActions'

const styles = theme => ({
  ...theme.spreadThis,
})

class login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData, this.props.history)
  }

  // handleGoogleSignIn = event => {
  //   event.preventDefault()
  //   this.props.loginGoogleUser(googleUser, this.props.history)
  // }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  responseGoogle = response => {
    console.log(response.tokenId)
    this.props.loginGoogleUser(response, this.props.history)
  }

  logout = response => {
    console.log(response)
    console.log('logged out')
  }

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props
    const { errors } = this.state

    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <Typography variant='h2' className={classes.pageTitle}>
            Log In
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
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
                'Log In'
              )}
            </Button>
            <br />
            <small>
              Don't have an account? <Link to='/signup'>Sign Up</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
})

const mapActionsToProps = {
  loginUser,
  loginGoogleUser,
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login))
