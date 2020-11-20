import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import { getCommentary } from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.spreadThis,
  profileBody: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    marginBottom: 8,
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
      <Card key={index} className={classes.card}>
        <CardContent>
          <Typography variant='overline'>{item.createdAt}</Typography>
          <Typography variant='h5'>{item.title}</Typography>
          <Typography variant='subtitle2'>{item.userName}</Typography>
          <Typography variant='body1'>{item.body}</Typography>
        </CardContent>
      </Card>
    ))

    return <div className={classes.profileBody}>{commentaryMarkup}</div>
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
