import {
  SET_TRACKS,
  SET_DEAD_TRACKS,
  PAY_RESPECTS,
  LOADING_DATA,
  SUBMIT_COMMENT,
  POST_VOTE,
  POST_TRACK,
  POST_COMMENTARY,
  SET_COMMENTARY,
} from '../types'

const initialState = {
  tracks: [],
  track: {},
  deadTracks: [],
  loading: false,
  voted: false,
  message: null,
  commentary: [],
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
      }
    case PAY_RESPECTS:
      let index = state.deadTracks.findIndex(track => {
        return track.trackId === action.payload.trackId
      })
      state.deadTracks[index] = action.payload
      if (state.deadTracks.trackId === action.payload.trackId) {
        state.deadTracks = { ...state.deadTracks, ...action.payload }
      }
      return {
        ...state,
      }
    case POST_TRACK:
      return { ...state }

    case POST_COMMENTARY: {
      return {
        ...state,
      }
    }
    case SET_COMMENTARY: {
      return {
        ...state,
        commentary: action.payload,
        loading: false,
      }
    }
    default:
      return state
  }
}

export default dataReducer
