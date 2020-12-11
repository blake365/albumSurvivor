import React, { Component } from 'react'
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

import AlbumIcon from '@material-ui/icons/Album'
import { Paper } from '@material-ui/core'

const styles = theme => ({
  ...theme.spreadThis,
  footer: {
    margin: 0,
    textAlign: 'center',
  },
  title: {
    flexGrow: 1,
    color: 'fff',
  },
})

class Footer extends Component {
  render() {
    const { classes } = this.props
    return (
      <Toolbar>
        <div className={classes.title}>
          Album Survivor is developed by Blake Morgan. <Link>Contact Me</Link>{' '}
          about bugs, new features, or album suggestions.
        </div>
        <div>
          <Button
            variant='outlined'
            component={Link}
            to='/archive'
            style={{ marginRight: 10 }}
          >
            Archives
          </Button>
          <Button variant='outlined'>Blog</Button>
        </div>
      </Toolbar>
    )
  }
}

export default withStyles(styles)(Footer)
