import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getTracks, postVote } from '../redux/actions/dataActions'

import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import PollOption from './PollOption'
import PollHeader from './PollHeader'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

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

    let pollOptionMarkup = !loading ? (
      tracks.map(track => (
        <PollOption
          selection={selection}
          track={track}
          key={track.name}
          onSelection={this.handleSelectedTrack}
          submitted={submitted}
        />
      ))
    ) : (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    )

    let submitButtonOption = authenticated ? (
      <Button
        type='submit'
        variant='contained'
        color='secondary'
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
        variant='contained'
        color='primary'
        disabled={this.state.disabled}
        className={classes.submitButton}
      >
        Login to Vote
      </Button>
    )

    return (
      <Paper className={classes.pollBody} elevation={2}>
        <PollHeader tracks={tracks} />
        <FormControl disabled={this.state.disabled} fullWidth>
          {pollOptionMarkup}
          {submitButtonOption}
        </FormControl>
      </Paper>
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
