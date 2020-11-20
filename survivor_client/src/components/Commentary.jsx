import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { getCommentary } from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.spreadThis,
  profileBody: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

class Commentary extends Component {
  componentDidMount() {
    this.props.getCommentary()
  }

  render() {
    const {
      classes,
      UI: loading,
      data: { commentary },
    } = this.props

    let commentaryMarkup = commentary.map((item, index) => (
      <div key={index}>
        <Typography variant='h6'>{item.title}</Typography>
        <Typography variant='body'>{item.body}</Typography>
      </div>
    ))

    return (
      <Paper className={classes.profileBody}>
        <Typography variant='h5'>Commentary: </Typography>
        <Typography variant='body1'></Typography>
        {commentaryMarkup}
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
