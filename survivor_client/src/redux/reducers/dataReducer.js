import {
  SET_TRACKS,
  SET_DEAD_TRACKS,
  LOADING_DATA,
  SUBMIT_COMMENT,
  POST_VOTE,
} from '../types'

const initialState = {
  tracks: [],
  track: {},
  deadTracks: [],
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
    case SET_DEAD_TRACKS:
      return {
        ...state,
        deadTracks: action.payload,
        loading: false,
      }
    case POST_VOTE:
      return {
        ...state,
        loading: false,
        voted: true,
        message: action.payload,
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
