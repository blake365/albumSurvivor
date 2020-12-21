import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { postVote2, anonVote } from '../redux/actions/dataActions'

import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import PollOption from './PollOption'
import PollHeader from './PollHeader'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    width: 'auto',
    height: 60,
    margin: 5,
    fontSize: '1.2rem',
    alignSelf: 'center',
  },
  submitAlert: {
    margin: 5,
    width: 'auto',
    alignSelf: 'center',
  },
  progressSpinner: {
    position: 'absolute',
  },
  PollBody: {
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

class PollNew extends Component {
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
      voted: false,
    }
  }

  handleSelectedTrack(selection) {
    this.setState({ selection })
  }

  submitVote = event => {
    event.preventDefault()
    if (this.state.selection !== '') {
      let today = new Date().toUTCString().split(' ')[1]

      let voteDoc = {
        date: new Date().toUTCString().split(' ')[1],
        albumId: this.props.album.albumId,
        selection: this.state.selection,
      }

      this.setState({ submitted: true, disabled: true })
      if (this.props.user.authenticated) {
        this.props.postVote2(this.props.album.albumId, this.state.selection)
        window.localStorage.setItem(
          this.props.album.albumName,
          JSON.stringify(voteDoc)
        )
      } else {
        let checkVoteDoc = window.localStorage.getItem(
          this.props.album.albumName
        )
        let voteDocJSON = JSON.parse(checkVoteDoc)
        if (!voteDocJSON || voteDocJSON.date !== today) {
          this.props.anonVote(
            this.props.album.albumId,
            this.state.selection,
            this.props.data.IP
          )
          console.log('vote cast')
          window.localStorage.setItem(
            this.props.album.albumName,
            JSON.stringify(voteDoc)
          )
        } else {
          console.log('already voted')
          this.setState({ submitted: true, disabled: true, voted: true })
        }
      }
    } else return
  }

  render() {
    const {
      classes,
      tracks,
      album,
      data: { loading },
      // user: { authenticated },
    } = this.props

    const { selection, submitted, voted } = this.state

    let PollOptionMarkup = tracks.map(track => (
      <PollOption
        selection={selection}
        track={track}
        key={track.name}
        onSelection={this.handleSelectedTrack}
        submitted={submitted}
        voted={voted}
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

    let PollEndedMarkup = (
      <Typography variant='h5' align='center'>
        This poll has ended. Check back soon for the next album.
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
        return PollEndedMarkup
      } else if (tracks.length === 1) {
        return winnerMarkup
      } else {
        return PollOptionMarkup
      }
    }

    function checkForButton() {
      if (tracks.length > 1) {
        return submitButtonOption
      } else return
    }

    let submitButtonOption = this.state.voted ? (
      <Alert severity='error' variant='filled' className={classes.submitAlert}>
        You have already voted today!
      </Alert>
    ) : (
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
    )

    return (
      <div>
        <Paper className={classes.PollBody} elevation={2}>
          <PollHeader tracks={tracks} album={album} />
          <FormControl disabled={this.state.disabled} fullWidth>
            {checkForWinner()}
            {checkForButton()}
          </FormControl>
        </Paper>
      </div>
    )
  }
}

PollNew.propTypes = {
  postVote2: PropTypes.func.isRequired,
  anonVote: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps, { postVote2, anonVote })(
  withStyles(styles)(PollNew)
)
