import {
  SET_TRACKS,
  SET_DEAD_TRACKS,
  LOADING_DATA,
  POST_VOTE,
  POST_TRACK,
  POST_COMMENTARY,
  SET_COMMENTARY,
  POST_ALBUM,
  SET_ALBUMS,
  SET_ALBUM,
  SET_ACTIVE_ALBUMS,
  SET_ALBUM_TRACKS,
  SET_ARCHIVES,
  REFRESH,
} from '../types'

const initialState = {
  tracks: [],
  activeAlbums: [],
  albums: [],
  album: [],
  track: {},
  deadTracks: [],
  loading: false,
  voted: false,
  message: null,
  commentary: [],
  archives: [],
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
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload,
        loading: false,
      }
    case REFRESH:
      return {
        ...state,
        activeAlbums: [],
      }
    case SET_ACTIVE_ALBUMS:
      return {
        ...state,
        activeAlbums: action.payload,
        loading: false,
      }
    case SET_ALBUM:
      return {
        ...state,
        album: action.payload,
      }
    case SET_ALBUM_TRACKS:
      return {
        ...state,
        // TODO: handle state for tracks within an album
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
    // case PAY_RESPECTS:
    // let index = state.deadTracks.findIndex(track => {
    //   return track.trackId === action.payload.trackId
    // })
    // state.deadTracks[index] = action.payload
    // if (state.deadTracks.trackId === action.payload.trackId) {
    //   state.deadTracks = { ...state.deadTracks, ...action.payload }
    // }
    // return {
    //   ...state,
    // }
    case POST_TRACK:
      return { ...state }
    case POST_ALBUM:
      return { ...state }
    case POST_COMMENTARY:
      return {
        ...state,
      }

    case SET_COMMENTARY:
      return {
        ...state,
        commentary: action.payload,
        loading: false,
      }
    case SET_ARCHIVES:
      return {
        ...state,
        archives: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

export default dataReducer
