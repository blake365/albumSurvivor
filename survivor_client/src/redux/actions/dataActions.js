import {
  SET_TRACKS,
  SET_DEAD_TRACKS,
  POST_VOTE,
  PAY_RESPECTS,
  POST_TRACK,
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

export const getGraveyardTracks = () => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/tracks/dead')
    .then(res => {
      dispatch({
        type: SET_DEAD_TRACKS,
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

export const payRespects = trackId => dispatch => {
  axios
    .get(`/tracks/${trackId}/payrespects`)
    .then(res => {
      dispatch({
        type: PAY_RESPECTS,
        payload: res.data,
      })
    })
    .catch(err => console.error(err))
}

export const postNewTrack = newTrackData => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/track', newTrackData)
    .then(res => {
      dispatch({
        type: POST_TRACK,
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
