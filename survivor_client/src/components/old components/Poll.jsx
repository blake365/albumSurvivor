import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getTracks, postVote } from '../../redux/actions/dataActions'

import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import PollOption from '../PollOption'
import PollHeader from '../PollHeader'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    width: 'auto',
    height: 60,
    margin: 5,
    fontSize: '1.2rem',
    alignSelf: 'center',
  },
  progressSpinner: {
    position: 'absolute',
  },
  pollBody: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
})

class Poll extends Component {
  constructor(props) {
    super(props)
    this.handleSelectedTrack = this.handleSelectedTrack.bind(this)
    this.submitVote = this.submitVote.bind(this)
    this.state = {
      selection: '',
      submitted: false,
      disabled: false,
      open: false,
      errors: {},
    }
  }

  componentDidMount() {
    this.props.getTracks()
  }

  handleSelectedTrack(selection) {
    this.setState({ selection })
  }

  submitVote = event => {
    event.preventDefault()
    if (this.state.selection !== '') {
      this.setState({ submitted: true, disabled: true })
      this.props.postVote(this.state.selection)
    } else return
  }

  render() {
    const {
      classes,
      data: { tracks, loading },
      user: { authenticated },
    } = this.props

    const { selection, submitted } = this.state

    let pollOptionMarkup = tracks.map(track => (
      <PollOption
        selection={selection}
        track={track}
        key={track.name}
        onSelection={this.handleSelectedTrack}
        submitted={submitted}
      />
    ))

    let winnerMarkup = tracks.map(track => (
      <PollOption
        selection={track.trackId}
        track={track}
        key={track.name}
        onSelection={this.handleSelectedTrack}
        submitted='winner'
      />
    ))

    let pollEndedMarkup = (
      <Typography variant='h5'>
        The poll has ended, check back soon for the next album
      </Typography>
    )

    function checkForWinner() {
      if (loading) {
        return (
          <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2} />
          </div>
        )
      } else if (tracks.length === 0) {
        return pollEndedMarkup
      } else if (tracks.length === 1) {
        return winnerMarkup
      } else {
        return pollOptionMarkup
      }
    }

    function checkForButton() {
      if (tracks.length > 1) {
        return submitButtonOption
      } else return
    }

    let submitButtonOption = authenticated ? (
      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={this.state.disabled}
        className={classes.submitButton}
        onClick={this.submitVote}
      >
        Cast Vote
      </Button>
    ) : (
      <Button
        type='link'
        component={Link}
        to='/login'
        variant='outlined'
        color='primary'
        disabled={this.state.disabled}
        className={classes.submitButton}
      >
        Login to Vote
      </Button>
    )

    return (
      <div>
        <Paper className={classes.pollBody} elevation={2}>
          <PollHeader tracks={tracks} />
          <FormControl disabled={this.state.disabled} fullWidth>
            {checkForWinner()}
            {checkForButton()}
          </FormControl>
        </Paper>
      </div>
    )
  }
}

Poll.propTypes = {
  getTracks: PropTypes.func.isRequired,
  postVote: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps, { getTracks, postVote })(
  withStyles(styles)(Poll)
)
