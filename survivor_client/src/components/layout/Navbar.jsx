import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'

//MUI imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../redux/actions/userActions'
import Chip from '@material-ui/core/Chip'

import AlbumIcon from '@material-ui/icons/Album'

const styles = theme => ({
  ...theme.spreadThis,
  title: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    lineHeight: 1,
    '&>*': {
      marginLeft: 10,
    },
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
          <div className={classes.title}>
            <Link to='/'>
              <AlbumIcon color='secondary' fontSize='large' />
            </Link>
            <Link to='/'>
              <Typography variant='h6' color='secondary'>
                Album Survivor
              </Typography>
            </Link>
            <Chip label='BETA' variant='outlined' color='secondary' />
          </div>
          {authenticated ? (
            <Fragment>
              <Button color='inherit'>
                <AccountBoxIcon />
              </Button>
              <Button color='inherit' onClick={this.handleLogout}>
                <ExitToAppIcon />
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
