import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { getArchives } from '../redux/actions/dataActions'
import ArchivePost from './ArchivePost'

const styles = theme => ({
  ...theme.spreadThis,
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  onePoll: {
    margin: '0px 5px 10px 5px',
    flex: 1,
    minWidth: 250,
    maxWidth: 400,
  },
})

class ArchiveWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getArchives()
  }

  render() {
    const {
      classes,
      data: { archives },
    } = this.props

    let archiveMarkup = archives.map(archive => (
      <div className={classes.onePoll} key={archive.archiveId}>
        <ArchivePost archive={archive} />
      </div>
    ))

    return <div className={classes.wrapper}>{archiveMarkup}</div>
  }
}

ArchiveWrapper.propTypes = {
  getArchives: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getArchives })(
  withStyles(styles)(ArchiveWrapper)
)
