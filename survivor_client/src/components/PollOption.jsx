import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

// import { connect } from 'react-redux'

const styles = theme => ({
  ...theme.spreadThis,
  content: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 0,
    '&:hover': {
      background: '#4caf50',
    },
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  trackInfo: {
    margin: 8,
    flexGrow: 1,
    overflow: 'wrap',
    width: '70%',
  },
  voteDisplay: {
    margin: 7,
    padding: 0,
    backgroundColor: '#4caf50',
  },
  winnerDisplay: {
    margin: 7,
    padding: 0,
  },
  radio: {
    margin: 8,
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
      selection,
      submitted,
      voted,
      classes,
      track: { name, trackId, votes },
    } = this.props

    return (
      <Card
        variant='outlined'
        style={
          selection === trackId
            ? {
                background: 'linear-gradient(45deg, #81c784 30%, #fff 90%)',
                border: 'solid 1px black',
                margin: 4,
              }
            : { margin: 4 }
        }
      >
        <CardContent className={classes.content}>
          <Grid container alignItems='center'>
            <Grid item className={classes.trackInfo}>
              <Typography variant='h6'>{name}</Typography>
            </Grid>
            <Grid item>
              {submitted ? (
                submitted === 'winner' ? (
                  <Chip
                    label='WINNER'
                    color='primary'
                    className={classes.winnerDisplay}
                  />
                ) : voted ? (
                  <Avatar className={classes.voteDisplay}>
                    {selection === trackId ? votes : votes}
                  </Avatar>
                ) : (
                  <Avatar className={classes.voteDisplay}>
                    {selection === trackId ? votes + 1 : votes}
                  </Avatar>
                )
              ) : (
                <Radio
                  className={classes.radio}
                  checked={selection === trackId}
                  onChange={this.handleChange}
                  value={trackId}
                  name={name}
                  inputProps={{ 'aria-label': name }}
                  color='default'
                />
              )}
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

export default withStyles(styles)(PollOption)
