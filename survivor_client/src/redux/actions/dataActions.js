import {
  SET_TRACKS,
  POST_VOTE,
  LOADING_DATA,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_SCREAM,
  LOADING_UI,
  STOP_LOADING_UI,
} from '../types'

import axios from 'axios'

//get all tracks
export const getTracks = () => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/tracks')
    .then(res => {
      dispatch({
        type: SET_TRACKS,
        payload: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: [],
      })
    })
}

export const postVote = trackId => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post(`/tracks/${trackId}/vote`)
    .then(res => {
      dispatch({
        type: POST_VOTE,
        payload: res.data,
      })
      dispatch(clearErrors())
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

//post a new scream
export const postScream = newScream => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/scream', newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      })
      dispatch(clearErrors())
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS })
}

// export const getUserData = userHandle => dispatch => {
//   dispatch({ type: LOADING_DATA })
//   axios
//     .get(`/user/${userHandle}`)
//     .then(res => {
//       dispatch({
//         type: SET_TRACKS,
//         payload: res.data.screams,
//       })
//     })
//     .catch(() => {
//       dispatch({
//         type: SET_TRACKS,
//         payload: null,
//       })
//     })
// }
