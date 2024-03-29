import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { getGraveyardTracks } from '../../redux/actions/dataActions'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import LikeButton from '../LikeButton'

const styles = theme => ({
  ...theme.spreadThis,
  title: {
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  header: {
    fontWeight: '600',
    fontSize: '1rem',
    padding: 5,
  },
  body: {
    fontSize: '1rem',
    padding: 4,
  },
  tableContainer: {
    padding: '10px 0 10px 0',
  },
})

class Graveyard extends Component {
  componentDidMount() {
    this.props.getGraveyardTracks()
  }

  render() {
    const {
      classes,
      data: { deadTracks, tracks },
    } = this.props

    return (
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label='graveyard table' size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center' className={classes.title} colSpan={4}>
                The Graveyard
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' className={classes.header}>
                Rank
              </TableCell>
              <TableCell className={classes.header}>Song</TableCell>
              <TableCell align='center' className={classes.header}>
                Votes
              </TableCell>
              <TableCell
                align='center'
                className={classes.header}
                style={{ paddingRight: 4 }}
              >
                Pay Respects
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deadTracks.length === 0 ? (
              <TableCell align='center' className={classes.title} colSpan={4}>
                No tracks have been voted out.
              </TableCell>
            ) : (
              deadTracks.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell
                    component='th'
                    scope='row'
                    align='center'
                    className={classes.body}
                  >
                    {tracks.length +
                      deadTracks.length -
                      (deadTracks.length - 1) +
                      index}
                  </TableCell>
                  <TableCell className={classes.body}>{row.name}</TableCell>
                  <TableCell align='center' className={classes.body}>
                    {row.votes}
                  </TableCell>
                  <TableCell
                    align='center'
                    className={classes.body}
                    style={{ paddingRight: 4 }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ paddingLeft: 12 }}>{row.respect}</div>
                      {row.respect < 1000 ? (
                        <LikeButton trackId={row.trackId} />
                      ) : (
                        <LikeButton />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

Graveyard.propTypes = {
  data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getGraveyardTracks })(
  withStyles(styles)(Graveyard)
)
