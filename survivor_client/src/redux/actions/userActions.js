import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED,
} from '../types'
import axios from 'axios'
// import { getTracks } from './dataActions'

// login user
export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
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

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', FBIdToken)
  axios.defaults.headers.common['Authorization'] = FBIdToken
}

//signup user
export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/signup', newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

// logout
export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBIdToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTHENTICATED })
  dispatch({ type: CLEAR_ERRORS })
}

// upload image
// export const uploadImage = formData => dispatch => {
//   dispatch({ type: LOADING_USER })
//   axios
//     .post(`/user/image`, formData)
//     .then(() => {
//       dispatch(getUserData())
//     })
//     .then(() => {
//       dispatch(getTracks())
//     })
//     .catch(err => console.log(err))
// }

//update user profile
// export const editUserDetails = userDetails => dispatch => {
//   dispatch({ type: LOADING_USER })
//   axios
//     .post(`/user`, userDetails)
//     .then(() => {
//       dispatch(getUserData())
//     })
//     .catch(err => console.log(err))
// }
