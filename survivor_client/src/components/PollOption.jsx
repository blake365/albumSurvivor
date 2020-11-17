import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'

// import { connect } from 'react-redux'

const styles = theme => ({
  ...theme.spreadThis,
  content: {
    padding: 8,
    '&:hover': {
      background: '#4aedc4',
    },
    '&:last-child': {
      paddingBottom: 8,
    },
  },
  trackInfo: {
    overflow: 'scroll',
  },
})

class PollOption extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.props.onSelection(event.target.value)
  }

  render() {
    const {
      classes,
      track: { name, description, trackId },
    } = this.props

    return (
      <Card
        variant='outlined'
        style={
          this.props.selection === trackId
            ? {
                background: 'linear-gradient(45deg, #4aedc4 30%, #fff 90%)',
                border: 'solid 1px black',
                margin: 4,
              }
            : { margin: 4 }
        }
      >
        <CardContent className={classes.content}>
          <Grid container alignItems='center' justify='center'>
            <Grid item xs={10} className={classes.trackInfo}>
              <Typography variant='h6'>{name}</Typography>
              {/* <Typography variant='subtitle1'>{description}</Typography> */}
            </Grid>
            <Grid item>
              <Radio
                checked={this.props.selection === trackId}
                onChange={this.handleChange}
                value={trackId}
                name={name}
                inputProps={{ 'aria-label': name }}
                color='primary'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

PollOption.propTypes = {
  track: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

// const mapStateToProps = state => ({
//   user: state.user,
// })

export default withStyles(styles)(PollOption)
