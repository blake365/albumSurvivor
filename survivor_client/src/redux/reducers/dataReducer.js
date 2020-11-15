import {
  SET_TRACKS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
  POST_VOTE,
} from '../types'

const initialState = {
  tracks: [],
  track: {},
  loading: false,
  voted: false,
  message: null,
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      }
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        loading: false,
      }
    case POST_VOTE:
      return {
        ...state,
        loading: false,
        voted: true,
        message: action.payload,
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      )
      state.screams[index] = action.payload
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload
      }
      return {
        ...state,
      }
    case DELETE_SCREAM:
      let deleteIndex = state.screams.findIndex(
        scream => scream.screamId === action.payload
      )
      state.screams.splice(deleteIndex, 1)
      return {
        ...state,
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      }
    case SET_SCREAM: {
      return {
        ...state,
        scream: action.payload,
      }
    }
    case SUBMIT_COMMENT: {
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      }
    }
    default:
      return state
  }
}

export default dataReducer
