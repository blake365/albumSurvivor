import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from '../types'

const initialState = {
  loading: false,
  errors: null,
  message: null,
}

// TODO: write clear all reducer for messages and errors

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      }
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        loading: false,
        message: null,
      }
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      }
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default uiReducer
