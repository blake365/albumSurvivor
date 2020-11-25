import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'

//MUI imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import ProfilePopper from './ProfilePopper'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'

import AlbumIcon from '@material-ui/icons/Album'

const styles = theme => ({
  ...theme.spreadThis,
  title: {
    flexGrow: 1,
    color: 'fff',
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
    const { classes, authenticated } = this.props
    return (
      <AppBar position='absolute'>
        <Toolbar className=''>
          <div className={classes.title}>
            <Link to='/'>
              <AlbumIcon fontSize='large' style={{ color: '#fff' }} />
            </Link>
            <Link to='/'>
              <Typography variant='h6' style={{ color: '#fff' }}>
                Album Survivor
              </Typography>
            </Link>
          </div>
          {authenticated ? (
            <Fragment>
              <div>
                <ProfilePopper />
              </div>
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
}

// const mapActionsToProps = { logoutUser}

const mapStateToProps = state => ({
  user: state.user,
  authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar))
