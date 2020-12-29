import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { getArchives } from '../redux/actions/dataActions'
import ArchivePost from './ArchivePost'
import Button from '@material-ui/core/Button'

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
    maxWidth: 325,
  },
})

class ArchiveWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: 0,
      direction: '',
      showAll: false,
    }
  }

  handleAllSubmit = event => {
    event.preventDefault()
    const start = {
      direction: 'all',
    }
    this.props.getArchives(start)
    this.setState({ showAll: true })
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

    return (
      <div>
        <div className={classes.wrapper}>{archiveMarkup}</div>
        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={this.handleAllSubmit}
            variant='contained'
            size='large'
            color='primary'
            disabled={this.state.showAll}
          >
            Show All
          </Button>
        </div>
      </div>
    )
  }
}

ArchiveWrapper.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getArchives })(
  withStyles(styles)(ArchiveWrapper)
)
