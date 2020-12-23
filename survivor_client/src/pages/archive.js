import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { getArchives, getFinalArchives } from '../redux/actions/dataActions'
import { connect } from 'react-redux'

import ArchiveWrapper from '../components/ArchiveWrapper'
import FinalArchiveWrapper from '../components/FinalArchiveWrapper'

const styles = theme => ({
  ...theme.spreadThis,
  spacer: {
    marginBottom: '10px',
  },
  hero: {
    padding: 10,
  },
})

export class archive extends Component {
  render() {
    const {
      classes,
      data: { finalArchives },
    } = this.props

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            className={classes.hero}
            align='center'
            color='primary'
          >
            Vote Archive
          </Typography>
          <ArchiveWrapper />
        </Grid>
        {finalArchives.length > 0 ? (
          <Grid item xs={12}>
            <Typography
              variant='h4'
              className={classes.hero}
              align='center'
              color='primary'
            >
              Final Results Archive
            </Typography>
            <FinalArchiveWrapper />
          </Grid>
        ) : null}
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps, { getArchives, getFinalArchives })(
  withStyles(styles)(archive)
)
