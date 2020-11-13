import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { getTracks, postVote } from '../redux/actions/dataActions'

import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PollOption from './PollOption'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    width: 120,
    margin: 5,
    alignSelf: 'center',
  },
  progressSpinner: {
    position: 'absolute',
  },
  pollBody: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    this.setState({ submitted: true, disabled: true })
    this.props.postVote(this.state.selection)
  }

  render() {
    const { classes } = this.props
    const { tracks, loading } = this.props.data
    const selection = this.state.selection

    console.log(selection)

    let pollOptionMarkup = !loading ? (
      tracks.map(track => (
        <PollOption
          selection={selection}
          track={track}
          key={track.trackId}
          onSelection={this.handleSelectedTrack}
        />
      ))
    ) : (
      <p>Loading</p>
    )
    return (
      <Paper className={classes.pollBody}>
        <Typography variant='h5'>
          Vote for your <strong>least</strong> favorite song on the album
        </Typography>
        <Typography variant='body1'>{tracks.length} songs remain</Typography>
        <FormControl disabled={this.state.disabled} fullWidth>
          {pollOptionMarkup}
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
})

export default connect(mapStateToProps, { getTracks, postVote })(
  withStyles(styles)(Poll)
)
