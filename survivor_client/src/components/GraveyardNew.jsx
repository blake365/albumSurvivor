import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Chip from '@material-ui/core/Chip'

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
    padding: '10px 0 10px 0',
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
        <Table aria-label='graveyard table' size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center' className={classes.title} colSpan={4}>
                Graveyard
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
                  return b.voteOutDay._seconds - a.voteOutDay._seconds
                })
                .map((row, index) => (
                  <TableRow key={row.name}>
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
                      {aliveTracks.length === 0 && index === 0 ? (
                        <Chip
                          label='WINNER'
                          color='primary'
                          className={classes.winnerDisplay}
                        />
                      ) : (
                        row.votes
                      )}
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
