import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'

import { connect } from 'react-redux'

export class PollOption extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.props.onSelection(event.target.value)
  }

  render() {
    const {
      track: { name, description, trackId },
      //   user: {
      //     authenticated,
      //     credentials: { handle },
      //   },
    } = this.props

    return (
      <Card variant='outlined' style={{ margin: 4 }}>
        <CardContent>
          <Grid container alignItems='center' justify='center'>
            <Grid item xs={10}>
              <Typography variant='h4'>{name}</Typography>
              <Typography variant='body2'>{description}</Typography>
            </Grid>
            <Grid item>
              <Radio
                checked={this.props.selection === trackId}
                onChange={this.handleChange}
                value={trackId}
                name={name}
                inputProps={{ 'aria-label': name }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

PollOption.propTypes = {
  user: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(PollOption)
