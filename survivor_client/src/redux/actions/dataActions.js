import {
  SET_TRACKS,
  SET_DEAD_TRACKS,
  POST_VOTE,
  PAY_RESPECTS,
  POST_TRACK,
  LOADING_DATA,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_USER,
  SET_USER,
  POST_COMMENTARY,
  SET_COMMENTARY,
  SET_MESSAGE,
  POST_ALBUM,
  SET_ALBUMS,
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

//get all albums
export const getAlbums = () => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/albums')
    .then(res => {
      dispatch({
        type: SET_ALBUMS,
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
      dispatch({
        type: SET_MESSAGE,
        payload: res.data,
      })
      dispatch(clearErrors())
      dispatch(getUserData())
      dispatch(getTracks())
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

export const postNewTrackToAlbum = (albumId, newTrackData) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post(`/albums/${albumId}/tracks`, newTrackData)
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

export const postNewAlbum = newAlbumData => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/albums', newAlbumData)
    .then(res => {
      dispatch({
        type: POST_ALBUM,
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

export const postNewCommentary = newCommentaryData => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/commentary', newCommentaryData)
    .then(res => {
      dispatch({
        type: POST_COMMENTARY,
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

export const getCommentary = () => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/commentary')
    .then(res => {
      dispatch({
        type: SET_COMMENTARY,
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

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS })
}

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER })
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    })
    .catch(err => console.log(err))
}

// upload image
export const uploadImage = (albumId, formData) => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .post(`/albums/${albumId}/art`, formData)
    .then(() => {
      dispatch(getAlbums())
    })
    .catch(err => console.log(err))
}
