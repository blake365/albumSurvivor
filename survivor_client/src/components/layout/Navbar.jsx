import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'

//MUI imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../redux/actions/userActions'

import HomeIcon from '@material-ui/icons/Home'
import AlbumIcon from '@material-ui/icons/Album'
import MyButton from '../../util/MyButton'

const styles = theme => ({
  ...theme.spreadThis,
  title: {
    marginLeft: 10,
    flexGrow: 1,
  },
})

export class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    const {
      classes,
      authenticated,
      user: { credentials },
    } = this.props
    return (
      <AppBar>
        <Toolbar className=''>
          <Link to='/'>
            <AlbumIcon color='secondary' fontSize='large' />
          </Link>
          <Typography variant='h6' color='secondary' className={classes.title}>
            Album Survivor
          </Typography>

          {authenticated ? (
            <Fragment>
              <Button color='inherit'>{credentials.userName}</Button>
              <Button color='inherit' onClick={this.handleLogout}>
                Logout
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' size='large' component={Link} to='/login'>
                Login
              </Button>
              <Button
                color='inherit'
                size='large'
                component={Link}
                to='/signup'
              >
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

// const mapActionsToProps = { logoutUser}

const mapStateToProps = state => ({
  user: state.user,
  authenticated: state.user.authenticated,
})

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Navbar)
)
