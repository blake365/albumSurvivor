import {
  SET_USER,
  POST_VOTE,
  //   SET_ERRORS,
  //   CLEAR_ERRORS,
  //   LOADING_UI,
  LIKE_SCREAM,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  UNLIKE_SCREAM,
} from '../types'

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  voteHistory: [],
  voted: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      }
    case SET_UNAUTHENTICATED:
      return initialState
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      }
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      }
    case POST_VOTE:
      return {
        ...state,
        voted: true,
      }
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      }
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId !== action.payload.screamId
        ),
      }
    default:
      return state
  }
}

export default userReducer
