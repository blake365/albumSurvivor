import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

//MUI imports
import Toolbar from '@material-ui/core/Toolbar'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...theme.spreadThis,
  footer: {
    marginTop: 30,
    borderTop: '1px solid black',
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
      <Toolbar className={classes.footer}>
        <Typography className={classes.title}>
          Album Survivor is developed by Blake Morgan.{' '}
          <a
            href='mailto:blake365morgan@me.com'
            style={{ color: '#1565c0', textDecoration: 'underline' }}
          >
            Contact Me
          </a>{' '}
          about <span style={{ color: 'red' }}>bugs</span>, feature ideas, or
          album suggestions.
        </Typography>
        {/** <div>
          <Button variant='outlined'>Blog</Button>
        </div> **/}
      </Toolbar>
    )
  }
}

export default withStyles(styles)(Footer)
