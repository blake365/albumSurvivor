import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { getCommentary } from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.spreadThis,

  card: {
    padding: '5px 15px 5px 15px',
    background: 'inherit',
  },
})

class Commentary extends Component {
  componentDidMount() {
    this.props.getCommentary()
  }

  render() {
    const {
      classes,
      data: { commentary },
    } = this.props

    return (
      <Paper className={classes.card} elevation={0}>
        <Typography variant='h5' color='primary'>
          What's Happening
        </Typography>
        <Typography variant='body1'>{commentary.body}</Typography>
      </Paper>
    )
  }
}

Commentary.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI,
})

export default connect(mapStateToProps, { getCommentary })(
  withStyles(styles)(Commentary)
)
