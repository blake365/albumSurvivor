import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Card from '@material-ui/core/Card'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  ...theme.spreadThis,
  card: {
    marginBottom: 8,
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  headline: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  newIcon: {
    display: 'flex',
    alignItems: 'center',
    color: 'limegreen',
  },
  winnerDisplay: {
    margin: 7,
    padding: 0,
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
})

class FinalArchivePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      tracks: [],
    }
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios
        .get(
          `https://us-central1-albumsurvivor.cloudfunctions.net/api/finalarchives/${this.props.archive.finalArchiveId}`
        )
        .then(result =>
          this.setState({
            loading: false,
            tracks: [...result.data],
          })
        )
    })
  }

  render() {
    const { classes } = this.props

    const { tracks, loading } = this.state

    let markup = !loading ? (
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          aria-label='graveyard table'
          size='small'
          style={{ background: '#fff' }}
        >
          <TableHead>
            <TableRow>
              <TableCell align='center' className={classes.title} colSpan={2}>
                Community Ranking
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' className={classes.header}>
                Rank
              </TableCell>
              <TableCell className={classes.header}>Song</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks
              .sort(function (a, b) {
                // console.log(a.voteOutDay._seconds)
                return b.voteOutDay - a.voteOutDay
              })
              .map((row, index) => (
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={20} thickness={2} />
      </div>
    )

    return <Card className={classes.card}>{markup}</Card>
  }
}

export default withStyles(styles)(FinalArchivePost)
