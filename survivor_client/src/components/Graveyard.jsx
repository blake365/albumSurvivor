import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { getGraveyardTracks } from '../redux/actions/dataActions'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LikeButton from './LikeButton'

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
})

class Graveyard extends Component {
  componentDidMount() {
    this.props.getGraveyardTracks()
  }

  render() {
    const {
      classes,
      UI: loading,
      data: { deadTracks },
    } = this.props

    return (
      <TableContainer component={Paper}>
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
            {deadTracks.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell
                  component='th'
                  scope='row'
                  align='center'
                  className={classes.body}
                >
                  {index + 1}
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
                  <div>
                    {row.respect}
                    <LikeButton trackId={row.trackId} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
  UI: state.UI,
})

export default connect(mapStateToProps, { getGraveyardTracks })(
  withStyles(styles)(Graveyard)
)
