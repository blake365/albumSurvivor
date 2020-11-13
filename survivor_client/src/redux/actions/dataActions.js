import {
  SET_TRACKS,
  POST_VOTE,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_ERRORS,
  DELETE_SCREAM,
  CLEAR_ERRORS,
  POST_SCREAM,
  LOADING_UI,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
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
    .post(`/track/${trackId}/vote`)
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

//like a scream
export const likeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      })
    })
    .catch(err => console.error(err))
}

//unlike a scream
export const unlikeScream = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      })
    })
    .catch(err => console.error(err))
}

//delete scream
export const deleteScream = screamId => dispatch => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      })
    })
    .catch(err => console.log(err))
}

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS })
}

export const getScream = screamId => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .get(`scream/${screamId}`)
    .then(res => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.error(err))
}

export const submitComment = (screamId, commentData) => dispatch => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
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

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_TRACKS,
        payload: res.data.screams,
      })
    })
    .catch(() => {
      dispatch({
        type: SET_TRACKS,
        payload: null,
      })
    })
}
