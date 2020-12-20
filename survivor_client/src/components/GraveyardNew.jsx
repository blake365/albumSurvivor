import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

// import LikeButton from './LikeButton'

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
    padding: '0 0 6px 0',
    background:
      'linear-gradient(0deg, rgba(21,101,192,1) 6px, rgba(255,255,255,1) 6px)',
  },
  winnerDisplay: {
    margin: 2,
    padding: 0,
  },
})

class GraveyardNew extends Component {
  render() {
    const { classes, deadTracks, aliveTracks } = this.props

    return (
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          aria-label='graveyard table'
          size='small'
          style={{ background: '#fff' }}
        >
          <TableHead>
            <TableRow>
              <TableCell align='center' className={classes.title} colSpan={4}>
                Results
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
              <TableCell align='center' className={classes.header}>
                %
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deadTracks.length === 0 ? (
              <TableRow>
                <TableCell align='center' className={classes.title} colSpan={4}>
                  No songs have been voted out.
                </TableCell>
              </TableRow>
            ) : (
              deadTracks
                .sort(function (a, b) {
                  // console.log(a.voteOutDay._seconds)
                  return b.voteOutDay - a.voteOutDay
                })
                .map((row, index) => (
                  <TableRow
                    key={row.name}
                    style={
                      aliveTracks.length === 0 && index === 0
                        ? { background: '#81d4fa' }
                        : null
                    }
                  >
                    <TableCell
                      component='th'
                      scope='row'
                      align='center'
                      className={classes.body}
                    >
                      {aliveTracks.length +
                        deadTracks.length -
                        (deadTracks.length - 1) +
                        index}
                    </TableCell>
                    <TableCell className={classes.body}>{row.name}</TableCell>
                    <TableCell align='center' className={classes.body}>
                      {row.votes}
                    </TableCell>
                    <TableCell align='center' className={classes.body}>
                      {((row.votes / row.roundVoteTotal) * 100).toFixed(0)}%
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

export default withStyles(styles)(GraveyardNew)
