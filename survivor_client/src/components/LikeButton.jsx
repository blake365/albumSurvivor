import React, { Component } from 'react'
import MyButton from '../util/MyButton'

import { connect } from 'react-redux'

import { payRespects } from '../redux/actions/dataActions'

class LikeButton extends Component {
  handlePayRespects = () => {
    if (this.props.trackId) {
      this.props.payRespects(this.props.albumId, this.props.trackId)
    } else return
  }

  render() {
    const { authenticated } = this.props.user
    const likeButton = !authenticated ? (
      <MyButton tip='Login to Pay Respects'></MyButton>
    ) : (
      <MyButton tip='Pay Respects' onClick={this.handlePayRespects}>
        🙌
      </MyButton>
    )

    return likeButton
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapActionsToProps = {
  payRespects,
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
