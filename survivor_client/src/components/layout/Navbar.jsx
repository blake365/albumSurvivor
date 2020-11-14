import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
// import '../../App.css'
//MUI imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// import AppBar from '@material-ui/core/AppBar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../redux/actions/userActions'

import HomeIcon from '@material-ui/icons/Home'
import AlbumIcon from '@material-ui/icons/Album'
import MyButton from '../../util/MyButton'

export class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    const {
      authenticated,
      user: { credentials },
    } = this.props
    return (
      <AppBar>
        <Toolbar className=''>
          <Typography variant='h5' color='secondary'>
            Album <AlbumIcon color='secondary' fontSize='large' /> Survivor
          </Typography>
          {authenticated ? (
            <Fragment>
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>
              <Button color='inherit'>{credentials.userName}</Button>
              <Button color='inherit' onClick={this.handleLogout}>
                Logout
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/'>
                Home
              </Button>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
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

export default connect(mapStateToProps, { logoutUser })(Navbar)
