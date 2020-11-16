import React, { Component } from 'react'
import MyButton from '../util/MyButton'

import FavoriteIcon from '@material-ui/icons/Favorite'

import { connect } from 'react-redux'

import { payRespects } from '../redux/actions/dataActions'

class LikeButton extends Component {
  handlePayRespects = () => {
    this.props.payRespects(this.props.trackId)
  }

  render() {
    const { authenticated } = this.props.user
    const likeButton = !authenticated ? (
      <MyButton tip='Login to Pay Respects'></MyButton>
    ) : (
      <MyButton tip='Pay Respects' onClick={this.handlePayRespects}>
        🙏
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
